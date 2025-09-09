# STARAJIN CMS Server

A headless CMS backend for the STARAJIN corporate website with automatic Korean translation capabilities.

## Features

- 🚀 **RESTful API** - Clean API endpoints for content management
- 🔐 **JWT Authentication** - Secure role-based access control (Admin/Editor/Viewer)
- 🌍 **Internationalization** - Built-in EN/KO translation support
- 📸 **Media Management** - File upload and management system
- 📄 **Page Management** - Dynamic page and section creation
- 🧭 **Menu System** - Configurable navigation menus
- 🤖 **Auto Translation** - Pluggable translation providers (Mock/Google/Naver/OpenAI)
- 📊 **Activity Logging** - Request logging and user activity tracking
- ⚡ **Type Safety** - Full TypeScript support with Prisma ORM

## Tech Stack

- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **MySQL** - Primary database
- **TypeScript** - Type-safe development
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Zod** - Schema validation
- **bcrypt** - Password hashing

## Quick Start

### 1. Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- npm or yarn

### 2. Installation

```bash
# Clone the repository (if not already done)
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 3. Environment Configuration

Edit `.env` file with your database credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/starajin_cms"
JWT_SECRET="your-secure-jwt-secret"
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 4. Database Setup

```bash
# Create database (MySQL command line)
mysql -u root -p
CREATE DATABASE starajin_cms;
exit

# Push database schema
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed database with sample data
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3001`

## API Endpoints

### Public Content API

```
GET  /api/content/:pageKey              # Get page content
GET  /api/content/nav/:menuKey          # Get navigation menu
GET  /api/content/search                # Search content
GET  /api/content/sitemap               # Get all pages for sitemap
```

### Authentication API

```
POST /api/auth/login                    # User login
POST /api/auth/register                 # Create user (Admin only)
GET  /api/auth/me                       # Get current user
PUT  /api/auth/profile                  # Update profile
PUT  /api/auth/password                 # Change password
GET  /api/auth/verify                   # Verify token
```

### Admin API (Authentication Required)

```
# Pages
GET    /api/admin/pages                 # List pages
GET    /api/admin/pages/:id             # Get page
POST   /api/admin/pages                 # Create page
PUT    /api/admin/pages/:id             # Update page
DELETE /api/admin/pages/:id             # Delete page
POST   /api/admin/pages/bulk            # Bulk operations
POST   /api/admin/pages/:id/duplicate   # Duplicate page

# Sections
GET    /api/admin/pages/:pageId/sections # Get page sections
POST   /api/admin/sections              # Create section
PUT    /api/admin/sections/:id          # Update section
DELETE /api/admin/sections/:id          # Delete section

# Menus
GET    /api/admin/menus                 # List menus
POST   /api/admin/menus                 # Create menu
PUT    /api/admin/menus/:id             # Update menu
DELETE /api/admin/menus/:id             # Delete menu
```

### Media API (Authentication Required)

```
POST   /api/media/upload                # Upload single file
POST   /api/media/upload/multiple       # Upload multiple files
GET    /api/media                       # List media files
GET    /api/media/:id                   # Get media file
PUT    /api/media/:id                   # Update media metadata
DELETE /api/media/:id                   # Delete media file
```

## Authentication & Authorization

The CMS uses JWT tokens for authentication with three role levels:

- **ADMIN** - Full access to all operations
- **EDITOR** - Can create/edit content but not delete pages or manage users
- **VIEWER** - Read-only access to content

### Default Credentials (After Seeding)

```
Admin:  admin@starajin.com  / admin123456
Editor: editor@starajin.com / editor123456
```

## Content Types

### Supported Section Types

- `hero` - Hero sections with images and CTAs
- `services` - Service listing with icons and descriptions
- `achievements` - Achievement cards and statistics
- `news` - News articles and updates
- `projects` - Project showcases
- `contact` - Contact information and forms
- `rich` - Rich text content with HTML

### Translation System

All content supports EN/KO localization:
- Pages have title, SEO metadata translations
- Sections have full content translations
- Menus have localized navigation items
- Media has alt-text translations

## Development

### Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm run start      # Start production server
npm run db:push    # Push schema changes to database
npm run db:generate # Generate Prisma client
npm run seed       # Seed database with sample data
npm run db:studio  # Open Prisma Studio (database GUI)
```

### Project Structure

```
server/
├── src/
│   ├── app.ts                 # Main Express application
│   ├── auth/                  # Authentication middleware & utilities
│   ├── i18n/                  # Translation providers
│   ├── routes/                # API route handlers
│   ├── services/              # Business logic services
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions & validation
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── uploads/                   # File upload directory
└── dist/                      # Compiled JavaScript output
```

### Adding Translation Providers

The system supports pluggable translation providers. To add a new provider:

1. Implement the `TranslationProvider` interface
2. Add configuration in `src/i18n/translationProvider.ts`
3. Set environment variables for API keys

Example providers included:
- MockTranslationProvider (development)
- GoogleTranslateProvider (placeholder)
- NaverPapagoProvider (placeholder)
- OpenAITranslateProvider (placeholder)

## Database Schema

The CMS uses a relational database with the following main entities:

- **User** - System users with role-based access
- **Page** - Website pages with SEO metadata
- **Section** - Page content sections with configurable types
- **Menu** - Navigation menu structures
- **Media** - Uploaded files and images
- **Translations** - Localized content for all entities

All content entities support multiple locales through dedicated translation tables.

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use a proper MySQL database (not local development)
3. Set a secure `JWT_SECRET`
4. Configure proper CORS origins
5. Set up file upload directory with proper permissions
6. Consider adding Redis for session management
7. Set up proper logging and monitoring

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "meta": { ... }        // Optional metadata (pagination, etc.)
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": [ ... ]     // Optional validation details
}
```

## Contributing

1. Follow TypeScript best practices
2. Use Prisma for all database operations
3. Validate all inputs with Zod schemas
4. Add proper error handling with try/catch
5. Include JSDoc comments for complex functions
6. Test API endpoints thoroughly

## License

MIT License - See LICENSE file for details.
