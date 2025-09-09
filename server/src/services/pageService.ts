import { prisma } from '../app';
import { CreatePageRequest, UpdatePageRequest, AdminPage } from '../types/api';
import { AppError } from '../utils/errorHandler';

/**
 * Service for handling admin page operations
 */
export class PageService {
  /**
   * Get all pages with pagination
   */
  async getPages(
    page: number = 1,
    limit: number = 20,
    sortBy: string = 'updatedAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ) {
    const skip = (page - 1) * limit;
    
    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          translations: true,
          _count: {
            select: { sections: true }
          }
        }
      }),
      prisma.page.count()
    ]);

    return {
      data: pages.map(this.formatPageForAdmin),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get single page by ID
   */
  async getPageById(id: number): Promise<AdminPage> {
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        translations: true
      }
    });

    if (!page) {
      throw new AppError('Page not found', 404);
    }

    return this.formatPageForAdmin(page);
  }

  /**
   * Get page by key
   */
  async getPageByKey(key: string): Promise<AdminPage> {
    const page = await prisma.page.findFirst({
      where: { key },
      include: {
        translations: true
      }
    });

    if (!page) {
      throw new AppError('Page not found', 404);
    }

    return this.formatPageForAdmin(page);
  }

  /**
   * Create new page
   */
  async createPage(data: CreatePageRequest): Promise<AdminPage> {
    // Check if page key already exists
    const existingPage = await prisma.page.findFirst({
      where: { key: data.key }
    });

    if (existingPage) {
      throw new AppError('Page with this key already exists', 409);
    }

    const page = await prisma.page.create({
      data: {
        key: data.key,
        slug: data.slug,
        isEnabled: data.isEnabled ?? true,
        translations: data.translations ? {
          create: data.translations
        } : undefined
      },
      include: {
        translations: true
      }
    });

    return this.formatPageForAdmin(page);
  }

  /**
   * Update page
   */
  async updatePage(id: number, data: UpdatePageRequest): Promise<AdminPage> {
    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id }
    });

    if (!existingPage) {
      throw new AppError('Page not found', 404);
    }

    // Check if key is being changed and doesn't conflict
    if (data.key && data.key !== existingPage.key) {
      const conflictPage = await prisma.page.findFirst({
        where: { 
          key: data.key,
          id: { not: id }
        }
      });

      if (conflictPage) {
        throw new AppError('Page with this key already exists', 409);
      }
    }

    // Handle translations update
    const updateData: any = {};
    if (data.key !== undefined) updateData.key = data.key;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.isEnabled !== undefined) updateData.isEnabled = data.isEnabled;

    if (data.translations) {
      // Delete existing translations and create new ones
      await prisma.pageTranslation.deleteMany({
        where: { pageId: id }
      });
      
      updateData.translations = {
        create: data.translations
      };
    }

    const page = await prisma.page.update({
      where: { id },
      data: updateData,
      include: {
        translations: true
      }
    });

    return this.formatPageForAdmin(page);
  }

  /**
   * Delete page
   */
  async deletePage(id: number): Promise<void> {
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: true
      }
    });

    if (!page) {
      throw new AppError('Page not found', 404);
    }

    // Check if page has sections
    if (page.sections.length > 0) {
      throw new AppError('Cannot delete page with existing sections. Delete sections first.', 400);
    }

    await prisma.page.delete({
      where: { id }
    });
  }

  /**
   * Bulk operations on pages
   */
  async bulkOperation(action: 'enable' | 'disable' | 'delete', ids: number[]) {
    let processed = 0;
    const failed: Array<{ id: number; error: string }> = [];

    for (const id of ids) {
      try {
        switch (action) {
          case 'enable':
            await prisma.page.update({
              where: { id },
              data: { isEnabled: true }
            });
            break;
          case 'disable':
            await prisma.page.update({
              where: { id },
              data: { isEnabled: false }
            });
            break;
          case 'delete':
            await this.deletePage(id);
            break;
        }
        processed++;
      } catch (error) {
        failed.push({
          id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return {
      success: true,
      processed,
      failed: failed.length,
      errors: failed.length > 0 ? failed : undefined
    };
  }

  /**
   * Duplicate page
   */
  async duplicatePage(id: number, newKey: string, newSlug: string): Promise<AdminPage> {
    const originalPage = await prisma.page.findUnique({
      where: { id },
      include: {
        translations: true,
        sections: {
          include: {
            translations: true
          }
        }
      }
    });

    if (!originalPage) {
      throw new AppError('Page not found', 404);
    }

    // Check if new key already exists
    const existingPage = await prisma.page.findFirst({
      where: { key: newKey }
    });

    if (existingPage) {
      throw new AppError('Page with this key already exists', 409);
    }

    // Create new page with sections
    const newPage = await prisma.page.create({
      data: {
        key: newKey,
        slug: newSlug,
        isEnabled: false, // Duplicated pages start disabled
        translations: {
          create: originalPage.translations.map(t => ({
            locale: t.locale,
            title: t.title ? `${t.title} (Copy)` : undefined,
            seoTitle: t.seoTitle,
            seoDesc: t.seoDesc,
            ogImageId: t.ogImageId
          }))
        },
        sections: {
          create: originalPage.sections.map(section => ({
            type: section.type,
            isEnabled: section.isEnabled,
            sortOrder: section.sortOrder,
            config: section.config,
            translations: {
              create: section.translations.map(t => ({
                locale: t.locale,
                content: t.content
              }))
            }
          }))
        }
      },
      include: {
        translations: true
      }
    });

    return this.formatPageForAdmin(newPage);
  }

  /**
   * Format page data for admin consumption
   */
  private formatPageForAdmin(page: any): AdminPage {
    return {
      id: page.id,
      key: page.key,
      slug: page.slug,
      isEnabled: page.isEnabled,
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
      translations: page.translations.map((t: any) => ({
        locale: t.locale,
        title: t.title || undefined,
        seoTitle: t.seoTitle || undefined,
        seoDesc: t.seoDesc || undefined,
        ogImageId: t.ogImageId || undefined
      }))
    };
  }
}
