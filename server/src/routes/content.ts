import { Router } from 'express';
import { ContentService } from '../services/contentService';
import { asyncHandler } from '../utils/errorHandler';
import { validateRequest, searchSchema } from '../utils/validation';
import { prisma } from '../app';

const router = Router();
const contentService = new ContentService();

/**
 * GET /api/content/pages
 * Get all pages list
 */
router.get('/pages', asyncHandler(async (req, res) => {
  const locale = req.query.locale as string || 'en';

  const pages = await prisma.page.findMany({
    include: {
      translations: {
        where: { locale }
      }
    }
  });

  res.json({
    success: true,
    data: pages
  });
}));

/**
 * GET /api/content/:pageKey
 * Get page content with sections
 */
router.get('/:pageKey', asyncHandler(async (req, res) => {
  const { pageKey } = req.params;
  const locale = req.query.locale as string || 'en';

  const content = await contentService.getPageContent(pageKey, locale);

  res.json({
    success: true,
    data: content
  });
}));

/**
 * GET /api/content/nav/:menuKey
 * Get navigation menu items
 */
router.get('/nav/:menuKey', asyncHandler(async (req, res) => {
  const { menuKey } = req.params;
  const locale = req.query.locale as string || 'en';

  const menuItems = await contentService.getNavigation(menuKey, locale);

  res.json({
    success: true,
    data: menuItems
  });
}));

/**
 * GET /api/content/search
 * Search content across pages
 */
router.get('/search', asyncHandler(async (req, res) => {
  try {
    const params = searchSchema.parse(req.query);
    
    const results = await contentService.searchContent(
      params.query,
      params.locale || 'en',
      params.pageKey,
      params.limit || 10
    );

    res.json({
      success: true,
      data: results,
      meta: {
        query: params.query,
        locale: params.locale || 'en',
        pageKey: params.pageKey,
        limit: params.limit || 10,
        count: results.length
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: 'Invalid search parameters',
      details: error.errors || error.message
    });
  }
}));

/**
 * GET /api/content/sitemap
 * Get all pages for sitemap generation
 */
router.get('/sitemap', asyncHandler(async (req, res) => {
  const pages = await contentService.getAllPages();

  res.json({
    success: true,
    data: pages
  });
}));

export default router;
