// Section content types that match the frontend contracts

export interface CTA {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'link';
}

export interface ImageRef {
  mediaId?: number;
  url: string;
  alt?: string;
}

// Hero Section
export interface HeroContent {
  heading?: string;
  subheading?: string;
  image?: ImageRef;
  ctas?: CTA[];
}

export interface HeroConfig {
  variant?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

// Achievements Section
export interface AchievementCard {
  tag: string;
  title: string;
  img: string;
  alt?: string;
}

export interface AchievementGroup {
  header: string;
  points: string[];
}

export interface AchievementsContent {
  heading?: string;
  subheading?: string;
  cards: AchievementCard[];
  groups: AchievementGroup[];
  ctas?: CTA[];
}

export interface AchievementsConfig {
  variant?: 'grid' | 'list';
}

// Services Section
export interface ServiceItem {
  icon?: string;
  title: string;
  summary?: string;
  href?: string;
}

export interface ServicesContent {
  heading?: string;
  subheading?: string;
  items: ServiceItem[];
  ctas?: CTA[];
}

export interface ServicesConfig {
  columns?: 2 | 3 | 4;
}

// News Section
export interface NewsItem {
  title: string;
  summary?: string;
  image?: ImageRef;
  href?: string;
  date?: string;
}

export interface NewsContent {
  heading?: string;
  subheading?: string;
  items: NewsItem[];
  ctas?: CTA[];
}

export interface NewsConfig {
  layout?: 'grid' | 'list';
  showDate?: boolean;
}

// Projects Section
export interface ProjectItem {
  title: string;
  summary?: string;
  image?: ImageRef;
  href?: string;
  tags?: string[];
}

export interface ProjectsContent {
  heading?: string;
  subheading?: string;
  items: ProjectItem[];
  ctas?: CTA[];
}

export interface ProjectsConfig {
  layout?: 'grid' | 'list';
  showTags?: boolean;
}

// Contact Section
export interface ContactContent {
  heading?: string;
  subheading?: string;
  addresses?: Array<{
    title: string;
    lines: string[];
  }>;
  phones?: Array<{
    label: string;
    number: string;
  }>;
  emails?: Array<{
    label: string;
    address: string;
  }>;
  ctas?: CTA[];
}

export interface ContactConfig {
  layout?: 'horizontal' | 'vertical';
  showMap?: boolean;
}

// Rich Text Section
export interface RichContent {
  heading?: string;
  subheading?: string;
  body?: string; // HTML content
  images?: ImageRef[];
  ctas?: CTA[];
}

export interface RichConfig {
  layout?: 'full' | 'narrow';
  theme?: 'light' | 'dark';
}

// Union types for type safety
export type SectionContent = 
  | HeroContent 
  | AchievementsContent 
  | ServicesContent 
  | NewsContent 
  | ProjectsContent 
  | ContactContent 
  | RichContent;

export type SectionConfig = 
  | HeroConfig 
  | AchievementsConfig 
  | ServicesConfig 
  | NewsConfig 
  | ProjectsConfig 
  | ContactConfig 
  | RichConfig;

export type SectionType = 
  | 'hero' 
  | 'achievements' 
  | 'services' 
  | 'news' 
  | 'projects' 
  | 'contact' 
  | 'rich';

// API Response types
export interface PublicSection {
  id: number;
  type: SectionType;
  isEnabled: boolean;
  sortOrder: number;
  config: SectionConfig | null;
  content: SectionContent;
  _fallback?: boolean;
}

export interface PublicPage {
  key: string;
  title?: string;
  _fallback?: boolean;
}

export interface PublicContentResponse {
  page: PublicPage;
  sections: PublicSection[];
}

export interface MenuItem {
  label: string;
  href: string;
  newTab: boolean;
  children?: MenuItem[];
}

// Admin types
export interface AdminSection extends PublicSection {
  pageId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPage {
  id: number;
  key: string;
  slug: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  translations: Array<{
    locale: string;
    title?: string;
    seoTitle?: string;
    seoDesc?: string;
    ogImageId?: number;
  }>;
}

export interface MediaItem {
  id: number;
  filename: string;
  url: string;
  mime: string;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
  translations: Array<{
    locale: string;
    altText?: string;
  }>;
}
