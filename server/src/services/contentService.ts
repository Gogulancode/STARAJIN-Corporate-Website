import { prisma } from '../app';
import { PublicContentResponse, PublicSection, MenuItem } from '../types/api';

/**
 * Service for handling public content retrieval
 */
export class ContentService {
  /**
   * Get page content with sections for public consumption
   */
  async getPageContent(pageKey: string, locale: string = 'en'): Promise<PublicContentResponse> {
    // Find page by key
    const page = await prisma.page.findFirst({
      where: {
        key: pageKey,
        isEnabled: true
      },
      include: {
        translations: {
          where: { locale }
        },
        sections: {
          where: { isEnabled: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            translations: {
              where: { locale }
            }
          }
        }
      }
    });

    if (!page) {
      // Return fallback response for non-existent pages
      return {
        page: {
          key: pageKey,
          _fallback: true
        },
        sections: []
      };
    }

    // Build page response
    const pageResponse = {
      key: page.key,
      title: page.translations[0]?.title,
      _fallback: page.translations.length === 0
    };

    // Build sections response
    const sections: PublicSection[] = page.sections.map(section => {
      const translation = section.translations[0];
      
      return {
        id: section.id,
        type: section.type as any,
        isEnabled: section.isEnabled,
        sortOrder: section.sortOrder,
        config: section.config as any,
        content: translation?.content || {},
        _fallback: !translation
      };
    });

    return {
      page: pageResponse,
      sections
    };
  }

  /**
   * Get navigation menu items
   */
  async getNavigation(menuKey: string, locale: string = 'en'): Promise<MenuItem[]> {
    const menu = await prisma.menu.findFirst({
      where: {
        key: menuKey,
        isEnabled: true
      },
      include: {
        translations: {
          where: { locale }
        }
      }
    });

    if (!menu || menu.translations.length === 0) {
      return [];
    }

    return menu.translations[0].items as MenuItem[];
  }

  /**
   * Search content across pages
   */
  async searchContent(query: string, locale: string = 'en', pageKey?: string, limit: number = 10) {
    // Basic text search implementation
    // In production, you might want to use a proper search engine like Elasticsearch
    
    const whereClause: any = {
      page: {
        isEnabled: true,
        ...(pageKey && { key: pageKey })
      },
      isEnabled: true,
      translations: {
        some: {
          locale,
          content: {
            string_contains: query // This is a simplified search - Prisma's full-text search would be better
          }
        }
      }
    };

    const sections = await prisma.section.findMany({
      where: whereClause,
      include: {
        page: {
          include: {
            translations: {
              where: { locale }
            }
          }
        },
        translations: {
          where: { locale }
        }
      },
      take: limit
    });

    return sections.map(section => ({
      pageKey: section.page.key,
      sectionId: section.id,
      title: section.page.translations[0]?.title,
      excerpt: this.extractExcerpt(section.translations[0]?.content, query),
      score: 1.0 // In a real implementation, you'd calculate relevance scores
    }));
  }

  /**
   * Extract text excerpt around search query
   */
  private extractExcerpt(content: any, query: string, maxLength: number = 200): string {
    if (!content) return '';
    
    // Convert content object to searchable text
    const text = this.contentToText(content);
    
    const queryIndex = text.toLowerCase().indexOf(query.toLowerCase());
    if (queryIndex === -1) {
      return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
    }

    const start = Math.max(0, queryIndex - 50);
    const end = Math.min(text.length, queryIndex + query.length + 50);
    
    let excerpt = text.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt = excerpt + '...';
    
    return excerpt;
  }

  /**
   * Convert content object to plain text for searching
   */
  private contentToText(content: any): string {
    if (typeof content === 'string') return content;
    if (!content || typeof content !== 'object') return '';

    let text = '';
    
    function extractText(obj: any): void {
      if (typeof obj === 'string') {
        text += obj + ' ';
      } else if (Array.isArray(obj)) {
        obj.forEach(extractText);
      } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(extractText);
      }
    }

    extractText(content);
    return text.trim();
  }

  /**
   * Get all available pages for sitemap generation
   */
  async getAllPages(): Promise<Array<{ key: string; slug: string; updatedAt: string }>> {
    const pages = await prisma.page.findMany({
      where: { isEnabled: true },
      select: {
        key: true,
        slug: true,
        updatedAt: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    return pages.map(page => ({
      key: page.key,
      slug: page.slug,
      updatedAt: page.updatedAt.toISOString()
    }));
  }
}
