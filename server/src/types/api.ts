// Authentication and user types
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
}

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Request/Response types for pages
export interface CreatePageRequest {
  key: string;
  slug: string;
  isEnabled?: boolean;
  translations?: Array<{
    locale: string;
    title?: string;
    seoTitle?: string;
    seoDesc?: string;
  }>;
}

export interface UpdatePageRequest {
  key?: string;
  slug?: string;
  isEnabled?: boolean;
  translations?: Array<{
    locale: string;
    title?: string;
    seoTitle?: string;
    seoDesc?: string;
  }>;
}

// Request/Response types for sections
export interface CreateSectionRequest {
  pageId: number;
  type: string;
  isEnabled?: boolean;
  sortOrder?: number;
  config?: any;
  translations?: Array<{
    locale: string;
    content: any;
  }>;
}

export interface UpdateSectionRequest {
  pageId?: number;
  type?: string;
  isEnabled?: boolean;
  sortOrder?: number;
  config?: any;
  translations?: Array<{
    locale: string;
    content: any;
  }>;
}

// Request/Response types for menus
export interface CreateMenuRequest {
  key: string;
  isEnabled?: boolean;
  translations?: Array<{
    locale: string;
    items: any[];
  }>;
}

export interface UpdateMenuRequest {
  key?: string;
  isEnabled?: boolean;
  translations?: Array<{
    locale: string;
    items: any[];
  }>;
}

// Media upload types
export interface MediaUploadResponse {
  id: number;
  filename: string;
  url: string;
  mime: string;
  width?: number;
  height?: number;
}

export interface UpdateMediaRequest {
  translations?: Array<{
    locale: string;
    altText?: string;
  }>;
}

// Translation provider types
export interface TranslationRequest {
  text: string;
  fromLang: string;
  toLang: string;
}

export interface TranslationResponse {
  translatedText: string;
  confidence?: number;
  provider?: string;
}

export interface TranslationProvider {
  name: string;
  translate(req: TranslationRequest): Promise<TranslationResponse>;
}

// Content indexing and search types
export interface ContentIndex {
  pageKey: string;
  sectionId: number;
  locale: string;
  content: string;
  lastUpdated: string;
}

export interface SearchRequest {
  query: string;
  locale?: string;
  pageKey?: string;
  limit?: number;
}

export interface SearchResult {
  pageKey: string;
  sectionId: number;
  title?: string;
  excerpt: string;
  score: number;
}

// Validation error types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationErrorResponse {
  success: false;
  error: string;
  details: ValidationError[];
}

// Database pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Bulk operations
export interface BulkOperationRequest {
  action: 'enable' | 'disable' | 'delete';
  ids: number[];
}

export interface BulkOperationResponse {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    id: number;
    error: string;
  }>;
}

// Activity logging
export interface ActivityLog {
  id: number;
  userId: number;
  action: string;
  resource: string;
  resourceId: number;
  details?: any;
  createdAt: string;
  user?: User;
}

// Export main API types
export * from './sections';
