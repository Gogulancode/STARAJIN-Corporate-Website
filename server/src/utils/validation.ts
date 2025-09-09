import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER'])
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']).optional(),
  isActive: z.boolean().optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters')
});

// Page validation schemas
export const createPageSchema = z.object({
  key: z.string().min(1, 'Page key is required').regex(/^[a-z0-9-_]+$/, 'Page key must contain only lowercase letters, numbers, hyphens, and underscores'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-_/]+$/, 'Slug must be a valid URL path'),
  isEnabled: z.boolean().optional().default(true),
  translations: z.array(z.object({
    locale: z.string().min(2, 'Locale must be at least 2 characters'),
    title: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDesc: z.string().optional()
  })).optional()
});

export const updatePageSchema = z.object({
  key: z.string().min(1).regex(/^[a-z0-9-_]+$/).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-_/]+$/).optional(),
  isEnabled: z.boolean().optional(),
  translations: z.array(z.object({
    locale: z.string().min(2),
    title: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDesc: z.string().optional()
  })).optional()
});

// Section validation schemas
const ctaSchema = z.object({
  text: z.string(),
  href: z.string(),
  style: z.enum(['primary', 'secondary', 'link']).optional()
});

const imageRefSchema = z.object({
  mediaId: z.number().optional(),
  url: z.string(),
  alt: z.string().optional()
});

const heroContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  image: imageRefSchema.optional(),
  ctas: z.array(ctaSchema).optional()
});

const achievementsContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  cards: z.array(z.object({
    tag: z.string(),
    title: z.string(),
    img: z.string(),
    alt: z.string().optional()
  })),
  groups: z.array(z.object({
    header: z.string(),
    points: z.array(z.string())
  })),
  ctas: z.array(ctaSchema).optional()
});

const servicesContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    summary: z.string().optional(),
    href: z.string().optional()
  })),
  ctas: z.array(ctaSchema).optional()
});

const newsContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  items: z.array(z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: imageRefSchema.optional(),
    href: z.string().optional(),
    date: z.string().optional()
  })),
  ctas: z.array(ctaSchema).optional()
});

const projectsContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  items: z.array(z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: imageRefSchema.optional(),
    href: z.string().optional(),
    tags: z.array(z.string()).optional()
  })),
  ctas: z.array(ctaSchema).optional()
});

const contactContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  addresses: z.array(z.object({
    title: z.string(),
    lines: z.array(z.string())
  })).optional(),
  phones: z.array(z.object({
    label: z.string(),
    number: z.string()
  })).optional(),
  emails: z.array(z.object({
    label: z.string(),
    address: z.string()
  })).optional(),
  ctas: z.array(ctaSchema).optional()
});

const richContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  body: z.string().optional(),
  images: z.array(imageRefSchema).optional(),
  ctas: z.array(ctaSchema).optional()
});

export const createSectionSchema = z.object({
  pageId: z.number().int().positive('Page ID must be a positive integer'),
  type: z.enum(['hero', 'achievements', 'services', 'news', 'projects', 'contact', 'rich']),
  isEnabled: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional(),
  config: z.any().optional(),
  translations: z.array(z.object({
    locale: z.string().min(2),
    content: z.union([
      heroContentSchema,
      achievementsContentSchema,
      servicesContentSchema,
      newsContentSchema,
      projectsContentSchema,
      contactContentSchema,
      richContentSchema
    ])
  })).optional()
});

export const updateSectionSchema = z.object({
  pageId: z.number().int().positive().optional(),
  type: z.enum(['hero', 'achievements', 'services', 'news', 'projects', 'contact', 'rich']).optional(),
  isEnabled: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  config: z.any().optional(),
  translations: z.array(z.object({
    locale: z.string().min(2),
    content: z.union([
      heroContentSchema,
      achievementsContentSchema,
      servicesContentSchema,
      newsContentSchema,
      projectsContentSchema,
      contactContentSchema,
      richContentSchema
    ])
  })).optional()
});

// Menu validation schemas
export const createMenuSchema = z.object({
  key: z.string().min(1, 'Menu key is required').regex(/^[a-z0-9-_]+$/, 'Menu key must contain only lowercase letters, numbers, hyphens, and underscores'),
  isEnabled: z.boolean().optional().default(true),
  translations: z.array(z.object({
    locale: z.string().min(2),
    items: z.array(z.any()) // Menu items structure can be flexible
  })).optional()
});

export const updateMenuSchema = z.object({
  key: z.string().min(1).regex(/^[a-z0-9-_]+$/).optional(),
  isEnabled: z.boolean().optional(),
  translations: z.array(z.object({
    locale: z.string().min(2),
    items: z.array(z.any())
  })).optional()
});

// Media validation schemas
export const updateMediaSchema = z.object({
  translations: z.array(z.object({
    locale: z.string().min(2),
    altText: z.string().optional()
  })).optional()
});

// Pagination and query schemas
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val) || 1).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(val => parseInt(val) || 20).pipe(z.number().min(1).max(100)).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  locale: z.string().optional(),
  pageKey: z.string().optional(),
  limit: z.string().transform(val => parseInt(val) || 10).pipe(z.number().min(1).max(50)).optional()
});

// Bulk operations schema
export const bulkOperationSchema = z.object({
  action: z.enum(['enable', 'disable', 'delete']),
  ids: z.array(z.number().int().positive()).min(1, 'At least one ID is required')
});

// Validation helper function
export function validateRequest<T>(schema: z.ZodSchema<T>, data: any): T {
  return schema.parse(data);
}
