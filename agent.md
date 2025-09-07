# agent.md — Starajin Website & CMS

**Purpose**
A single source of truth for any AI assistant or developer working on the Starajin web stack. It defines architecture, naming, i18n, CMS contracts, design rules, and acceptance criteria so changes remain consistent and reversible.

---

## 0) Current State Snapshot

* **Frontend**: React + React Router + Tailwind + TypeScript.
* **Locale strategy**: URL prefix (`/en` or `/ko`) with localStorage persistence and browser-language bootstrapping. No hardcoded KR/EN strings in components.
* **Messages**: Centralized, nested objects in `src/i18n/translations.ts`.
* **Content**: For now, loaded from local JSON (fake CMS). Real CMS will be Node + Express + Prisma + MySQL.
* **Design system**: Tokens and font helpers live in `src/styles/design-tokens.ts` and `src/styles/font-config.ts`.

---

## 1) Goals & Non‑Goals

**Goals**

* Localized site (EN/KR) with URL prefixes and persistent user choice.
* Headless CMS with page/section model, media upload, menus, CTAs, enable/disable switches.
* Automatic EN→KO machine translation with manual override and status.
* Strong design consistency via tokens and Tailwind.

**Non‑Goals**

* No third‑party CDN i18n runtimes.
* No lock‑in to a specific cloud; the CMS is portable (local FS uploads can be swapped for S3 later).

---

## 2) Repository Layout (frontend)

```
src/
  i18n/
    translation-config.ts   # detect/persist/swap locale, helpers
    routing.ts              # URL helpers built on React Router
    translations.ts         # nested messages for EN/KR (UI copy only)
  contexts/
    I18nContext.tsx         # Provider + t()/get() helpers
  hooks/
    useEnhancedTranslations.ts
  components/
    LocalizedLink.tsx
    LanguageSwitcher.tsx
    HeaderNav.tsx
    Footer.tsx
    KeyAchievements.tsx     # render-only; receives props for data
  pages/
    HomePage.tsx            # fetch localized data and render sections
    AboutPage.tsx
    ServicesPage.tsx
    ProjectsPage.tsx
    CultureExchangePage.tsx
    MediaPage.tsx
    ContactPage.tsx
  pages/services/
    translation-service.ts  # fake CMS: returns localized JSON until server is ready
styles/
  design-tokens.ts          # source of truth tokens (see §7)
  font-config.ts            # font stacks & text presets
public/
  achievements/*            # section images
```

---

## 3) i18n Rules

* **Nested messages** only. Example keys: `nav.home`, `achievements.kicker`, etc.
* **UI copy** stays in `translations.ts`.
* **Editable content** (lists, cards, bodies) must come from CMS (`/api/content/:pageKey?locale=…`).
* **Locale source**: URL prefix (`/:locale(en|ko)/*`).
* **Persistence**: write to `localStorage.locale` on route changes.
* **Detection**: if no prefix and no stored value, pick by browser language (`ko*` → `ko` else `en`).
* **No component may contain user‑facing literal KR/EN strings.**

**Helpers**

* `useEnhancedTranslations(ns?: string)` → `{ t(key), get(path), locale }`
* `LocalizedLink` wraps React Router `Link` and preserves the prefix.
* `LanguageSwitcher` swaps `/en` ↔ `/ko` in current path and persists choice.

---

## 4) Section Data Shapes (frontend contracts)

All section types use a consistent, locale‑specific **content** shape plus a non‑translated **config**. These mirror CMS storage and API responses.

```ts
// Generic CTA
export type CTA = { text: string; href: string; style?: 'primary'|'secondary'|'link' };

// Hero
export type HeroContent = { heading: string; subheading?: string; image?: ImageRef; ctas?: CTA[] };
export type HeroConfig = { variant?: 'left'|'center'|'right'; theme?: 'light'|'dark' };

// Achievements
export type AchievementCard = { tag: string; title: string; img: string; alt?: string };
export type AchievementGroup = { header: string; points: string[] };
export type AchievementsContent = {
  heading?: string; subheading?: string;
  cards: AchievementCard[]; groups: AchievementGroup[]; ctas?: CTA[]
};
export type AchievementsConfig = { variant?: 'grid'|'list' };

// Services
export type ServiceItem = { icon?: string; title: string; summary?: string; href?: string };
export type ServicesContent = { heading?: string; subheading?: string; items: ServiceItem[]; ctas?: CTA[] };
export type ServicesConfig = { columns?: 2|3|4 };

// Projects/Media/News can reuse list- or card-based patterns with the same CTA and image refs.

export type ImageRef = { mediaId?: number; url: string; alt?: string };
```

Frontend **must** render whatever the CMS returns for each section `type`, using `content` for locale‑specific fields and `config` for layout/theme knobs.

---

## 5) CMS Architecture (server)

* **Stack**: Node 18, Express, Prisma, MySQL, Multer uploads (`/uploads`).
* **Models**: Page, PageTranslation, Section, SectionTranslation, Media, MediaTranslation, Menu, MenuItem (plus translation tables). Translation status: `DRAFT | MACHINE | EDITED | APPROVED`.
* **Translation provider**: interface with adapters; default Mock returns `[ko]` suffixed text. Adapters for Google / Papago / OpenAI can be added via env vars.
* **Visibility**: `Page.isEnabled` & `Section.isEnabled` control public output.

**Key tables** (abridged):

* `Page(key, slug, isEnabled)` ↔ `Section(pageId, type, sortOrder, isEnabled, config JSON)`
* `SectionTranslation(sectionId, locale, content JSON, status)`
* `PageTranslation(pageId, locale, title, seoTitle, seoDesc, ogImageId)`
* `Media(file, url, w, h)` ↔ `MediaTranslation(mediaId, locale, altText)`
* `Menu(key)` ↔ `MenuItem(menuId, linkType, route, url, isEnabled, sortOrder, newTab)` ↔ `MenuItemTranslation(menuItemId, locale, label)`

---

## 6) CMS API (public)

All JSON. `locale` is required; default `en`.

### `GET /api/content/:pageKey?locale=en|ko`

Returns enabled sections for the page (ordered by `sortOrder`). Fallback: if `ko` missing, serve English with `"_fallback": true` on that node.

```json
{
  "page": { "key": "home", "title": "…" },
  "sections": [
    {
      "id": 12,
      "type": "achievements",
      "isEnabled": true,
      "sortOrder": 2,
      "config": { "variant": "grid" },
      "content": {
        "heading": "Impact & Milestones",
        "subheading": "Public–private partnerships…",
        "cards": [{ "tag": "G2B MoU", "title": "…", "img": "/uploads/a.jpg" }],
        "groups": [{ "header": "MoUs & Market Entry", "points": ["…"] }],
        "ctas": [{ "text": "Discuss a similar project", "href": "/contact" }]
      }
    }
  ]
}
```

### `GET /api/nav/header?locale=x` and `GET /api/nav/footer?locale=x`

```json
[
  { "label": "Services", "href": "/en/services", "newTab": false },
  { "label": "Contact", "href": "/en/contact" }
]
```

### `GET /uploads/*`

Static media.

---

## 7) CMS API (admin, protected)

* **Pages**: CRUD, enable/disable; page‑level translations & SEO.
* **Sections**:

  * `POST /api/admin/pages/:pageId/sections` (create)
  * `PATCH /api/admin/sections/:id` (toggle, sortOrder, config)
  * `PUT /api/admin/sections/:id/translations/:locale` (`content`, `status`)
  * `POST /api/admin/sections/:id/translate` → machine translate EN → KO (don't overwrite EDITED/APPROVED)
* **Menus**: CRUD menu items; per‑locale `label`; internal/external links; enable/disable; `sortOrder`.
* **Media**: upload via `multer`; per‑locale alt text; delete.
* **Auth**: email+password → JWT; roles `ADMIN`, `EDITOR`, `VIEWER`.

**Validation**: use zod on all inputs.

---

## 8) Design System (source of truth)

**Files**

* `src/styles/design-tokens.ts` (colors, spacing, radii, shadows, motion, z-index, typography; `token.*()` helpers)
* `src/styles/font-config.ts` (font stacks, weights, `textPresets`)

**Brand Colors**

* Primary `#023EDA` (see tokens' `primary`/`primaryDark`/`primaryLight` equivalents)
* Secondary `#ffc700`

**Usage with Tailwind**

```html
<button class="bg-primary text-white hover:bg-primary/90" />
<span class="text-secondary" />
```

**Usage with tokens (JS styles)**

```ts
import { token } from '@/styles/design-tokens';
const accent = token.color('primary');
```

**Typography helpers**

```ts
import { textPresets } from '@/styles/font-config';
<h1 style={textPresets.headingLg}>Heading</h1>
```

**Motion**

```ts
import { durations, easing } from '@/styles/design-tokens';
const style = { transition: `opacity ${durations.fast}ms ${easing.out}` };
```

**Guidelines**

* Prefer Tailwind utilities for layout; use tokens for dynamic inline styles or when third‑party libs lack Tailwind access.
* Keep tokens backward compatible; extend instead of mutating names.
* When updating brand colors, sync Tailwind config and `design-tokens.ts`.

---

## 9) Accessibility & SEO

* Every image requires localized `alt`.
* Heading order: one `<h1>` per page; sections use `<h2>`/`<h3>`.
* Locale‑specific `<title>` and meta description per page (read from `PageTranslation`).
* Use `lang` attribute on `<html>` based on current locale.

---

## 10) Images & Performance

* Upload originals; server should generate web‑friendly variants if needed (future enhancement).
* Prefer `.jpg`/`.webp` for photos; `.png` for logos/alpha.
* Recommended hero width ≥ 1600px; cards ≥ 1200px long edge. Use progressive JPEG and `quality≈85–92`.

---

## 11) Caching Strategy

* Public GETs: `Cache-Control: public, max-age=60, stale-while-revalidate=300`.
* Admin endpoints: `no-store`.
* Frontend: ISR‑like behavior can be added later with on‑demand revalidation webhook.

---

## 12) Security

* Validate all inputs (zod). Sanitize HTML if rich text is enabled.
* Enforce authz: only admins can delete; editors can create/update content.
* Never trust `href` blindly; whitelist internal routes; mark external links with `rel="noopener noreferrer"` when `newTab`.

---

## 13) Playbooks

### A) Add a new page (e.g., FAQ)

1. Admin: POST `/api/admin/pages` with `{ key:'faq', slug:'/faq' }`.
2. Create initial sections with `type:'rich'`.
3. Provide English `SectionTranslation` content.
4. Click **Auto‑translate** to create KO draft.
5. Enable page and add header/footer menu items (both locales).
6. Frontend: add route `<Route path="faq" element={<FaqPage/>}/>`.

### B) Add a new section type (e.g., Timeline)

1. Define content & config types in `server/src/types/sections.ts`.
2. Add renderer in frontend `components/sections/Timeline.tsx`.
3. Update admin validators to allow `type:'timeline'` and its content schema.

### C) Add a translation key

1. Edit `src/i18n/translations.ts` in both `en` and `ko`.
2. Use `t('namespace.key')` in components; never hardcode text.

### D) Switch to a real translator

1. Add API credentials in `.env` and implement adapter.
2. Update `TRANSLATION_PROVIDER` env var.
3. Keep machine‑translated status as `MACHINE` until editors update.

---

## 14) Acceptance Criteria (definition of done)

* `/en/*` and `/ko/*` render fully localized UI copy from `translations.ts`.
* Public content comes from CMS for each page/section in the requested locale, with fallback markers when necessary.
* Header and footer menus come from CMS and reflect enable/disable, sort, and targets.
* Editors can enable/disable pages/sections; upload images; manage CTAs and links.
* All new strings appear in both locales (messages or CMS translations).
* No regression on accessibility (images have alt, headings structured) and performance (images optimized).

---

## 15) Environment & Commands

**Frontend**

* `npm run dev` — React dev server

**Server**

* `MYSQL_URL=…`
* `npm run db:push` — Prisma push
* `npm run seed` — create default pages/menus/sections
* `npm run dev` — start Express (nodemon)

---

## 16) Glossary

* **UI copy**: static labels/titles; lives in `translations.ts`.
* **Content**: editor‑managed text/media per section; lives in CMS, delivered via API.
* **Config**: non‑translated layout/theme knobs for a section.
* **Machine translation**: auto EN→KO result; must be reviewed.

---

## 17) Change Log Policy

* Use Conventional Commits: `feat(i18n): …`, `fix(cms): …`, `docs(design): …`.
* For schema changes, include a migration summary and bump minor version.

---

**Source of Design Truth**: `design-tokens.ts` & `font-config.ts` (see §8). Keep Tailwind config in sync with tokens.
