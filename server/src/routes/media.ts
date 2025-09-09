import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { prisma } from '../app';
import { authenticateToken, requireRole } from '../auth/middleware';
import { asyncHandler, AppError } from '../utils/errorHandler';
import { validateRequest, updateMediaSchema, paginationSchema } from '../utils/validation';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    
    // Ensure upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .substring(0, 50);
    
    cb(null, `${timestamp}-${randomSuffix}-${basename}${ext}`);
  }
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allowed file types
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/**
 * POST /api/media/upload
 * Upload media file
 */
router.post('/upload', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    const { originalname, filename, mimetype, size, path: filePath } = req.file;
    
    // Get file dimensions for images
    let width: number | undefined;
    let height: number | undefined;
    
    if (mimetype.startsWith('image/')) {
      try {
        // You could use sharp or another image library here
        // For now, we'll leave dimensions undefined
      } catch (error) {
        console.warn('Could not get image dimensions:', error);
      }
    }

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: originalname,
        storedFilename: filename,
        url: `/uploads/${filename}`,
        mime: mimetype,
        size,
        width,
        height
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: media.id,
        filename: media.filename,
        url: media.url,
        mime: media.mime,
        width: media.width,
        height: media.height
      }
    });
  })
);

/**
 * POST /api/media/upload/multiple
 * Upload multiple media files
 */
router.post('/upload/multiple',
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  upload.array('files', 10),
  asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      throw new AppError('No files uploaded', 400);
    }

    const mediaItems = [];
    
    for (const file of files) {
      const { originalname, filename, mimetype, size } = file;
      
      const media = await prisma.media.create({
        data: {
          filename: originalname,
          storedFilename: filename,
          url: `/uploads/${filename}`,
          mime: mimetype,
          size
        }
      });

      mediaItems.push({
        id: media.id,
        filename: media.filename,
        url: media.url,
        mime: media.mime,
        width: media.width,
        height: media.height
      });
    }

    res.status(201).json({
      success: true,
      data: mediaItems
    });
  })
);

/**
 * GET /api/media
 * Get all media with pagination
 */
router.get('/', 
  authenticateToken,
  requireRole('ADMIN', 'EDITOR', 'VIEWER'),
  asyncHandler(async (req, res) => {
    const params = validateRequest(paginationSchema, req.query);
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    
    const skip = (page - 1) * limit;
    
    const [mediaItems, total] = await Promise.all([
      prisma.media.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          translations: true
        }
      }),
      prisma.media.count()
    ]);

    const formattedItems = mediaItems.map(item => ({
      id: item.id,
      filename: item.filename,
      url: item.url,
      mime: item.mime,
      width: item.width,
      height: item.height,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      translations: item.translations.map(t => ({
        locale: t.locale,
        altText: t.altText
      }))
    }));

    res.json({
      success: true,
      data: formattedItems,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  })
);

/**
 * GET /api/media/:id
 * Get single media item
 */
router.get('/:id',
  authenticateToken,
  requireRole('ADMIN', 'EDITOR', 'VIEWER'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        translations: true
      }
    });

    if (!media) {
      throw new AppError('Media not found', 404);
    }

    res.json({
      success: true,
      data: {
        id: media.id,
        filename: media.filename,
        url: media.url,
        mime: media.mime,
        width: media.width,
        height: media.height,
        createdAt: media.createdAt.toISOString(),
        updatedAt: media.updatedAt.toISOString(),
        translations: media.translations.map(t => ({
          locale: t.locale,
          altText: t.altText
        }))
      }
    });
  })
);

/**
 * PUT /api/media/:id
 * Update media metadata
 */
router.put('/:id',
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = validateRequest(updateMediaSchema, req.body);

    const media = await prisma.media.findUnique({
      where: { id }
    });

    if (!media) {
      throw new AppError('Media not found', 404);
    }

    // Update translations if provided
    if (data.translations) {
      // Delete existing translations
      await prisma.mediaTranslation.deleteMany({
        where: { mediaId: id }
      });

      // Create new translations
      if (data.translations.length > 0) {
        await prisma.mediaTranslation.createMany({
          data: data.translations.map(t => ({
            mediaId: id,
            locale: t.locale,
            altText: t.altText
          }))
        });
      }
    }

    // Get updated media with translations
    const updatedMedia = await prisma.media.findUnique({
      where: { id },
      include: {
        translations: true
      }
    });

    res.json({
      success: true,
      data: {
        id: updatedMedia!.id,
        filename: updatedMedia!.filename,
        url: updatedMedia!.url,
        mime: updatedMedia!.mime,
        width: updatedMedia!.width,
        height: updatedMedia!.height,
        createdAt: updatedMedia!.createdAt.toISOString(),
        updatedAt: updatedMedia!.updatedAt.toISOString(),
        translations: updatedMedia!.translations.map(t => ({
          locale: t.locale,
          altText: t.altText
        }))
      }
    });
  })
);

/**
 * DELETE /api/media/:id
 * Delete media file
 */
router.delete('/:id',
  authenticateToken,
  requireRole('ADMIN', 'EDITOR'),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const media = await prisma.media.findUnique({
      where: { id }
    });

    if (!media) {
      throw new AppError('Media not found', 404);
    }

    // Delete file from filesystem
    if (media.storedFilename) {
      const filePath = path.join(__dirname, '../../uploads', media.storedFilename);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.warn('Could not delete file from filesystem:', error);
      }
    }

    // Delete from database
    await prisma.media.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  })
);

export default router;
