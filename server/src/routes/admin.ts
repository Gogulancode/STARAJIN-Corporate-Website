import { Router } from 'express';
import { prisma } from '../app';
import { authenticateToken, requireRole } from '../auth/middleware';
import { PageService } from '../services/pageService';
import { asyncHandler } from '../utils/errorHandler';
import { 
  validateRequest, 
  createPageSchema, 
  updatePageSchema,
  createSectionSchema,
  updateSectionSchema,
  createMenuSchema,
  updateMenuSchema,
  paginationSchema,
  bulkOperationSchema
} from '../utils/validation';

const router = Router();
const pageService = new PageService();

// Apply authentication to all admin routes
router.use(authenticateToken);

//
// PAGE ROUTES
//

/**
 * GET /api/admin/pages
 * Get all pages with pagination
 */
router.get('/pages', 
  requireRole('ADMIN', 'EDITOR', 'VIEWER'),
  asyncHandler(async (req, res) => {
    const params = validateRequest(paginationSchema, req.query);
    const { page = 1, limit = 20, sortBy = 'updatedAt', sortOrder = 'desc' } = params;

    const result = await pageService.getPages(page, limit, sortBy, sortOrder);

    res.json({
      success: true,
      ...result
    });
  })
);

/**
 * GET /api/admin/pages/:id
 * Get single page by ID
 */
router.get('/pages/:id',
  requireRole('ADMIN', 'EDITOR', 'VIEWER'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const page = await pageService.getPageById(id);

    res.json({
      success: true,
      data: page
    });
  })
);

/**
 * POST /api/admin/pages
 * Create new page
 */
router.post('/pages',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const data = validateRequest(createPageSchema, req.body);
    const page = await pageService.createPage(data);

    res.status(201).json({
      success: true,
      data: page
    });
  })
);

/**
 * PUT /api/admin/pages/:id
 * Update page
 */
router.put('/pages/:id',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = validateRequest(updatePageSchema, req.body);
    const page = await pageService.updatePage(id, data);

    res.json({
      success: true,
      data: page
    });
  })
);

/**
 * DELETE /api/admin/pages/:id
 * Delete page
 */
router.delete('/pages/:id',
  requireRole('ADMIN'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await pageService.deletePage(id);

    res.json({
      success: true,
      message: 'Page deleted successfully'
    });
  })
);

/**
 * POST /api/admin/pages/bulk
 * Bulk operations on pages
 */
router.post('/pages/bulk',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const { action, ids } = validateRequest(bulkOperationSchema, req.body);
    
    // Only admins can delete pages
    if (action === 'delete' && req.user?.role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        error: 'Only administrators can delete pages'
      });
      return;
    }

    const result = await pageService.bulkOperation(action, ids);
    res.json(result);
  })
);

/**
 * POST /api/admin/pages/:id/duplicate
 * Duplicate page
 */
router.post('/pages/:id/duplicate',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { key, slug } = req.body;

    if (!key || !slug) {
      res.status(400).json({
        success: false,
        error: 'Key and slug are required for duplication'
      });
      return;
    }

    const page = await pageService.duplicatePage(id, key, slug);

    res.status(201).json({
      success: true,
      data: page
    });
  })
);

//
// SECTION ROUTES
//

/**
 * GET /api/admin/pages/:pageId/sections
 * Get sections for a page
 */
router.get('/pages/:pageId/sections',
  requireRole('ADMIN', 'EDITOR', 'VIEWER'),
  asyncHandler(async (req, res) => {
    const pageId = parseInt(req.params.pageId);

    const sections = await prisma.section.findMany({
      where: { pageId },
      orderBy: { sortOrder: 'asc' },
      include: {
        translations: true
      }
    });

    const formattedSections = sections.map(section => ({
      id: section.id,
      pageId: section.pageId,
      type: section.type,
      isEnabled: section.isEnabled,
      sortOrder: section.sortOrder,
      config: section.config,
      createdAt: section.createdAt.toISOString(),
      updatedAt: section.updatedAt.toISOString(),
      translations: section.translations.map(t => ({
        locale: t.locale,
        content: t.content
      }))
    }));

    res.json({
      success: true,
      data: formattedSections
    });
  })
);

/**
 * POST /api/admin/sections
 * Create new section
 */
router.post('/sections',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const data = validateRequest(createSectionSchema, req.body);

    const section = await prisma.section.create({
      data: {
        pageId: data.pageId,
        type: data.type,
        isEnabled: data.isEnabled ?? true,
        sortOrder: data.sortOrder ?? 0,
        config: data.config,
        translations: data.translations ? {
          create: data.translations
        } : undefined
      },
      include: {
        translations: true
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: section.id,
        pageId: section.pageId,
        type: section.type,
        isEnabled: section.isEnabled,
        sortOrder: section.sortOrder,
        config: section.config,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
        translations: section.translations.map(t => ({
          locale: t.locale,
          content: t.content
        }))
      }
    });
  })
);

/**
 * PUT /api/admin/sections/:id
 * Update section
 */
router.put('/sections/:id',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = validateRequest(updateSectionSchema, req.body);

    // Update section data
    const updateData: any = {};
    if (data.pageId !== undefined) updateData.pageId = data.pageId;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.isEnabled !== undefined) updateData.isEnabled = data.isEnabled;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
    if (data.config !== undefined) updateData.config = data.config;

    if (data.translations) {
      // Delete existing translations and create new ones
      await prisma.sectionTranslation.deleteMany({
        where: { sectionId: id }
      });
      
      updateData.translations = {
        create: data.translations
      };
    }

    const section = await prisma.section.update({
      where: { id },
      data: updateData,
      include: {
        translations: true
      }
    });

    res.json({
      success: true,
      data: {
        id: section.id,
        pageId: section.pageId,
        type: section.type,
        isEnabled: section.isEnabled,
        sortOrder: section.sortOrder,
        config: section.config,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
        translations: section.translations.map(t => ({
          locale: t.locale,
          content: t.content
        }))
      }
    });
  })
);

/**
 * DELETE /api/admin/sections/:id
 * Delete section
 */
router.delete('/sections/:id',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.section.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Section deleted successfully'
    });
  })
);

//
// MENU ROUTES
//

/**
 * GET /api/admin/menus
 * Get all menus
 */
router.get('/menus',
  requireRole('ADMIN', 'EDITOR', 'VIEWER'),
  asyncHandler(async (req, res) => {
    const menus = await prisma.menu.findMany({
      include: {
        translations: true
      },
      orderBy: { key: 'asc' }
    });

    const formattedMenus = menus.map(menu => ({
      id: menu.id,
      key: menu.key,
      isEnabled: menu.isEnabled,
      createdAt: menu.createdAt.toISOString(),
      updatedAt: menu.updatedAt.toISOString(),
      translations: menu.translations.map(t => ({
        locale: t.locale,
        items: t.items
      }))
    }));

    res.json({
      success: true,
      data: formattedMenus
    });
  })
);

/**
 * POST /api/admin/menus
 * Create new menu
 */
router.post('/menus',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const data = validateRequest(createMenuSchema, req.body);

    const menu = await prisma.menu.create({
      data: {
        key: data.key,
        isEnabled: data.isEnabled ?? true,
        translations: data.translations ? {
          create: data.translations
        } : undefined
      },
      include: {
        translations: true
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: menu.id,
        key: menu.key,
        isEnabled: menu.isEnabled,
        createdAt: menu.createdAt.toISOString(),
        updatedAt: menu.updatedAt.toISOString(),
        translations: menu.translations.map(t => ({
          locale: t.locale,
          items: t.items
        }))
      }
    });
  })
);

/**
 * PUT /api/admin/menus/:id
 * Update menu
 */
router.put('/menus/:id',
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = validateRequest(updateMenuSchema, req.body);

    const updateData: any = {};
    if (data.key !== undefined) updateData.key = data.key;
    if (data.isEnabled !== undefined) updateData.isEnabled = data.isEnabled;

    if (data.translations) {
      await prisma.menuTranslation.deleteMany({
        where: { menuId: id }
      });
      
      updateData.translations = {
        create: data.translations
      };
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: updateData,
      include: {
        translations: true
      }
    });

    res.json({
      success: true,
      data: {
        id: menu.id,
        key: menu.key,
        isEnabled: menu.isEnabled,
        createdAt: menu.createdAt.toISOString(),
        updatedAt: menu.updatedAt.toISOString(),
        translations: menu.translations.map(t => ({
          locale: t.locale,
          items: t.items
        }))
      }
    });
  })
);

/**
 * DELETE /api/admin/menus/:id
 * Delete menu
 */
router.delete('/menus/:id',
  requireRole('ADMIN'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.menu.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Menu deleted successfully'
    });
  })
);

export default router;
