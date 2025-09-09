import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { importExistingHomePageContent } from './utils/importExistingContentFixed';

// Import routes
import authRoutes from './routes/auth';
// import contentRoutes from './routes/content';  // Temporarily disabled due to TypeScript issues
// import adminRoutes from './routes/admin';      // Temporarily disabled due to TypeScript issues
// import mediaRoutes from './routes/media';      // Temporarily disabled due to TypeScript issues

// Import middleware
import { errorHandler } from './utils/errorHandler';
import { requestLogger } from './utils/logger';

// Load environment variables
config();

// Force restart - updating port to 3006
// Initialize Prisma client
export const prisma = new PrismaClient();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3002'  // Allow requests from same port for CMS
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static files for CMS frontend
app.use(express.static(path.join(__dirname, '../public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/content', contentRoutes);  // Temporarily disabled due to TypeScript issues
// app.use('/api/admin', adminRoutes);      // Temporarily disabled due to TypeScript issues
// app.use('/api/media', mediaRoutes);      // Temporarily disabled due to TypeScript issues

// Direct pages endpoint
app.get('/api/pages', async (req, res) => {
  try {
    const locale = req.query.locale as string || 'en';
    const key = req.query.key as string;
    
    let whereClause = {};
    if (key) {
      whereClause = { key };
    }
    
    const pages = await prisma.page.findMany({
      where: whereClause,
      include: {
        translations: {
          where: { locale }
        },
        sections: {
          orderBy: { sortOrder: 'asc' },
          include: {
            translations: {
              where: { locale }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      data: pages
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pages'
    });
  }
});

// Update page endpoint
app.put('/api/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, seoDesc, isEnabled, sections } = req.body;
    
    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: parseInt(id) },
      data: {
        isEnabled: isEnabled === 'true' || isEnabled === true,
        updatedAt: new Date()
      },
      include: {
        translations: true
      }
    });

    // Update page translation
    if (title || seoDesc) {
      await prisma.pageTranslation.updateMany({
        where: { 
          pageId: parseInt(id),
          locale: 'en' // Default to English for now
        },
        data: {
          title: title || undefined,
          seoDesc: seoDesc || undefined
        }
      });
    }

    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      // Delete existing sections and their translations
      await prisma.sectionTranslation.deleteMany({
        where: { 
          section: { pageId: parseInt(id) }
        }
      });
      
      await prisma.section.deleteMany({
        where: { pageId: parseInt(id) }
      });

      // Create new sections
      for (const section of sections) {
        const newSection = await prisma.section.create({
          data: {
            pageId: parseInt(id),
            type: section.type,
            sortOrder: section.sortOrder,
            isEnabled: section.isEnabled,
            config: section.config || {}
          }
        });

        // Create section translation
        await prisma.sectionTranslation.create({
          data: {
            sectionId: newSection.id,
            locale: 'en',
            content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content
          }
        });
      }
    }

    res.json({
      success: true,
      data: updatedPage
    });
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update page'
    });
  }
});

// Direct menus endpoint
app.get('/api/menus', async (req, res) => {
  try {
    const locale = req.query.locale as string || 'en';
    
    const menus = await prisma.menu.findMany({
      include: {
        items: {
          include: {
            translations: {
              where: { locale }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      data: menus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menus'
    });
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    return res.json({
      success: true,
      data: {
        url: `http://localhost:3002${fileUrl}`,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to upload file'
    });
  }
});

// Import existing home page content to CMS
app.post('/api/import-home-content', async (req, res) => {
  try {
    const result = await importExistingHomePageContent();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to import home page content'
    });
  }
});

// app.use('/api/admin', adminRoutes);      // Temporarily disabled due to Prisma schema issues
// app.use('/api/media', mediaRoutes);      // Temporarily disabled due to Prisma schema issues

// Admin interface route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// Catch-all for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Catch-all for other routes - serve index.html for SPA routing
app.use('*', (req, res) => {
  // If it's a file request (has extension), return 404
  if (path.extname(req.originalUrl)) {
    res.status(404).json({
      success: false,
      error: 'File not found',
      path: req.originalUrl
    });
  } else {
    // For other routes, you might want to serve your main app's index.html
    res.status(404).json({
      success: false,
      error: 'Route not found',
      path: req.originalUrl
    });
  }
});

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔌 Received SIGINT. Graceful shutdown...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔌 Received SIGTERM. Graceful shutdown...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 CMS Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
