# TASKS.md — Imperial Central Security Databank

## Milestone 1: Project Scaffold and Foundation

### Environment Setup
- [x] Initialize Astro project with TypeScript template
  **Completed:** 2025-10-12

- [x] Install Tailwind CSS dependencies
  **Completed:** 2025-10-12

- [x] Configure Tailwind with custom Imperial color tokens
  **Completed:** 2025-10-12

- [x] Install MDX integration for Astro
  **Completed:** 2025-10-12

- [x] Install Fuse.js for search functionality
  **Completed:** 2025-10-12

- [x] Configure TypeScript with strict mode
  **Completed:** 2025-10-12

- [x] Create `.gitignore` with Node and Astro artifacts
  **Completed:** 2025-10-12

### Base Layout
- [x] Create BaseLayout.astro with HTML shell
  **Completed:** 2025-10-12

- [x] Add navigation component with Imperial styling
  **Completed:** 2025-10-12

- [x] Add footer with "Unauthorized access logged" note
  **Completed:** 2025-10-12

- [x] Configure SEO meta tags in BaseLayout
  **Completed:** 2025-10-12

- [x] Add skip-to-content accessibility link
  **Completed:** 2025-10-12

- [ ] Create 404 error page with Imperial theme
  **Completed:** ___________

### Image Optimization Pipeline
- [x] Create `scripts/optimize-images.sh` script
  **Completed:** 2025-10-12

- [ ] Test image optimization with sample portrait
  **Completed:** ___________

- [ ] Document image requirements in README
  **Completed:** ___________

- [ ] Add pre-commit hook for image validation
  **Completed:** ___________

### Build Configuration
- [ ] Configure Astro build output directory
  **Completed:** ___________

- [ ] Add sitemap generation plugin
  **Completed:** ___________

- [ ] Create robots.txt file
  **Completed:** ___________

- [ ] Test local development server
  **Completed:** ___________

- [ ] Test production build process
  **Completed:** ___________

---

## Milestone 2: Content Collections and Schema

### Content Collection Setup
- [x] Create `/src/content/stories/` directory
  **Completed:** 2025-10-12

- [x] Define Zod schema for story frontmatter
  **Completed:** 2025-10-12

- [x] Register stories collection in Astro config
  **Completed:** 2025-10-12

- [x] Add TypeScript types for story collection
  **Completed:** 2025-10-12

- [ ] Test schema validation with invalid data
  **Completed:** ___________

### Sample Story Creation
- [x] Create `/public/images/stories/` directory
  **Completed:** 2025-10-12

- [ ] Convert Bilar "Bill" Saruun PDF to MDX
  **Completed:** ___________

- [ ] Add portrait image for Bilar story
  **Completed:** ___________

- [ ] Create second sample story MDX file
  **Completed:** ___________

- [ ] Add portrait image for second story
  **Completed:** ___________

- [ ] Validate frontmatter schema compliance
  **Completed:** ___________

### Story Components
- [ ] Create StoryCard.astro component
  **Completed:** ___________

- [ ] Create StoryMeta.astro component
  **Completed:** ___________

- [ ] Test StoryCard with sample data
  **Completed:** ___________

- [ ] Test StoryMeta with sample data
  **Completed:** ___________

---

## Milestone 3: Story List and Search

### Story List Page
- [ ] Create `/src/pages/stories/index.astro`
  **Completed:** ___________

- [ ] Fetch all stories from content collection
  **Completed:** ___________

- [ ] Render story grid with StoryCard components
  **Completed:** ___________

- [ ] Add grid/compact view toggle button
  **Completed:** ___________

- [ ] Style story list with Tailwind classes
  **Completed:** ___________

### Search Implementation
- [ ] Create SearchClient.ts with Fuse.js wrapper
  **Completed:** ___________

- [ ] Generate JSON search index at build time
  **Completed:** ___________

- [ ] Add search input field to stories page
  **Completed:** ___________

- [ ] Implement debounced search handler
  **Completed:** ___________

- [ ] Test search with title queries
  **Completed:** ___________

- [ ] Test search with character name queries
  **Completed:** ___________

- [ ] Test search with tag queries
  **Completed:** ___________

- [ ] Verify search performance under 100ms
  **Completed:** ___________

### Filter Chips
- [ ] Create filter chip component
  **Completed:** ___________

- [ ] Add era filter chips
  **Completed:** ___________

- [ ] Add species filter chips
  **Completed:** ___________

- [ ] Add tag filter chips
  **Completed:** ___________

- [ ] Implement multi-select filter logic
  **Completed:** ___________

- [ ] Add "Clear filters" button
  **Completed:** ___________

- [ ] Style filter chips with Imperial theme
  **Completed:** ___________

---

## Milestone 4: Story Detail Page

### Story Layout
- [ ] Create StoryLayout.astro component
  **Completed:** ___________

- [ ] Create `/src/pages/stories/[slug].astro` dynamic route
  **Completed:** ___________

- [ ] Render story content with MDX
  **Completed:** ___________

- [ ] Add story metadata display with StoryMeta
  **Completed:** ___________

- [ ] Style story content with readable typography
  **Completed:** ___________

- [ ] Set content width to ~65 characters
  **Completed:** ___________

- [ ] Add portrait image to story header
  **Completed:** ___________

### Table of Contents
- [ ] Create TOCClient.ts script
  **Completed:** ___________

- [ ] Extract h2 and h3 headings from DOM
  **Completed:** ___________

- [ ] Generate heading IDs automatically
  **Completed:** ___________

- [ ] Render TOC in sticky sidebar
  **Completed:** ___________

- [ ] Add smooth scroll to heading on click
  **Completed:** ___________

- [ ] Highlight active section in TOC
  **Completed:** ___________

- [ ] Implement mobile collapsible TOC
  **Completed:** ___________

### Copy Section Link
- [ ] Add "copy link" button to each heading
  **Completed:** ___________

- [ ] Implement clipboard copy functionality
  **Completed:** ___________

- [ ] Show success toast on copy
  **Completed:** ___________

- [ ] Test copy-link with keyboard navigation
  **Completed:** ___________

### Reading Progress Bar
- [ ] Create progress bar component
  **Completed:** ___________

- [ ] Calculate scroll progress percentage
  **Completed:** ___________

- [ ] Update progress bar on scroll
  **Completed:** ___________

- [ ] Style progress bar with Imperial accent color
  **Completed:** ___________

- [ ] Test progress bar on long stories
  **Completed:** ___________

### Linked Stories
- [ ] Add "Related Stories" section to layout
  **Completed:** ___________

- [ ] Fetch linked stories from frontmatter
  **Completed:** ___________

- [ ] Render linked stories with StoryCard
  **Completed:** ___________

- [ ] Test linked stories navigation
  **Completed:** ___________

---

## Milestone 5: Polish and Optimization

### Home Page
- [ ] Create `/src/pages/index.astro`
  **Completed:** ___________

- [ ] Add site introduction content
  **Completed:** ___________

- [ ] Display 3 latest stories
  **Completed:** ___________

- [ ] Add "View all stories" CTA button
  **Completed:** ___________

- [ ] Style home page with Imperial branding
  **Completed:** ___________

### About Page
- [ ] Create `/src/pages/about.astro`
  **Completed:** ___________

- [ ] Add fan project disclaimer
  **Completed:** ___________

- [ ] Add contact/contribution information
  **Completed:** ___________

- [ ] Style about page consistently
  **Completed:** ___________

### Characters Index (Optional)
- [ ] Create `/src/pages/characters/index.astro`
  **Completed:** ___________

- [ ] Extract unique characters from stories
  **Completed:** ___________

- [ ] Sort characters alphabetically
  **Completed:** ___________

- [ ] Add species and affiliation to character list
  **Completed:** ___________

- [ ] Link characters to their stories
  **Completed:** ___________

- [ ] Add filter by species/affiliation
  **Completed:** ___________

### Print Styles
- [ ] Create print.css with clean story layout
  **Completed:** ___________

- [ ] Hide navigation and footer in print view
  **Completed:** ___________

- [ ] Hide TOC sidebar in print view
  **Completed:** ___________

- [ ] Optimize typography for print
  **Completed:** ___________

- [ ] Test print layout in Chrome/Firefox
  **Completed:** ___________

### OpenGraph Images
- [ ] Create default OG image template
  **Completed:** ___________

- [ ] Generate per-story OG images
  **Completed:** ___________

- [ ] Add OG meta tags to story pages
  **Completed:** ___________

- [ ] Test OG preview in Twitter/Discord
  **Completed:** ___________

### Accessibility Audit
- [ ] Run Lighthouse accessibility audit
  **Completed:** ___________

- [ ] Fix color contrast issues
  **Completed:** ___________

- [ ] Add ARIA labels to interactive elements
  **Completed:** ___________

- [ ] Test keyboard navigation on all pages
  **Completed:** ___________

- [ ] Test with screen reader (NVDA/VoiceOver)
  **Completed:** ___________

- [ ] Add alt text to all images
  **Completed:** ___________

- [ ] Add focus states to buttons and links
  **Completed:** ___________

### Performance Optimization
- [ ] Run Lighthouse performance audit
  **Completed:** ___________

- [ ] Optimize Tailwind CSS bundle size
  **Completed:** ___________

- [ ] Verify JavaScript bundle under 60 KB
  **Completed:** ___________

- [ ] Verify CSS bundle under 60 KB
  **Completed:** ___________

- [ ] Optimize WebP image loading
  **Completed:** ___________

- [ ] Add loading="lazy" to portrait images
  **Completed:** ___________

- [ ] Test page load on slow 3G connection
  **Completed:** ___________

- [ ] Achieve Lighthouse Performance ≥ 90
  **Completed:** ___________

- [ ] Achieve Lighthouse Accessibility ≥ 95
  **Completed:** ___________

### SEO
- [ ] Add unique title tags to all pages
  **Completed:** ___________

- [ ] Add meta descriptions to all pages
  **Completed:** ___________

- [ ] Generate sitemap.xml
  **Completed:** ___________

- [ ] Verify robots.txt configuration
  **Completed:** ___________

- [ ] Test structured data markup
  **Completed:** ___________

---

## Milestone 6: Content Migration

### PDF Conversion Setup
- [ ] Create Python PDF extraction script
  **Completed:** ___________

- [ ] Test extraction with sample PDF
  **Completed:** ___________

- [ ] Document PDF-to-MDX conversion workflow
  **Completed:** ___________

- [ ] Create MDX template for new stories
  **Completed:** ___________

### Story Migration
- [ ] Convert story 1 from PDF to MDX
  **Completed:** ___________

- [ ] Convert story 2 from PDF to MDX
  **Completed:** ___________

- [ ] Convert story 3 from PDF to MDX
  **Completed:** ___________

- [ ] Convert story 4 from PDF to MDX
  **Completed:** ___________

- [ ] Convert story 5 from PDF to MDX
  **Completed:** ___________

- [ ] Validate all migrated stories render correctly
  **Completed:** ___________

- [ ] Add original PDF download links
  **Completed:** ___________

- [ ] Copy original PDFs to `/public/docs/`
  **Completed:** ___________

---

## Milestone 7: Deployment and Launch

### Deployment Setup
- [ ] Choose hosting platform (Netlify/Vercel/Cloudflare)
  **Completed:** ___________

- [ ] Connect Git repository to hosting
  **Completed:** ___________

- [ ] Configure build command
  **Completed:** ___________

- [ ] Configure deployment branch
  **Completed:** ___________

- [ ] Set up custom domain (optional)
  **Completed:** ___________

- [ ] Test production deployment
  **Completed:** ___________

### Pre-Launch Testing
- [ ] Test all pages on Chrome
  **Completed:** ___________

- [ ] Test all pages on Firefox
  **Completed:** ___________

- [ ] Test all pages on Safari
  **Completed:** ___________

- [ ] Test all pages on mobile Chrome
  **Completed:** ___________

- [ ] Test all pages on mobile Safari
  **Completed:** ___________

- [ ] Test search functionality end-to-end
  **Completed:** ___________

- [ ] Test filter functionality end-to-end
  **Completed:** ___________

- [ ] Test TOC navigation end-to-end
  **Completed:** ___________

- [ ] Test copy-link functionality
  **Completed:** ___________

- [ ] Test print layout on multiple browsers
  **Completed:** ___________

### Documentation
- [ ] Create README.md with project overview
  **Completed:** ___________

- [ ] Document local development setup
  **Completed:** ___________

- [ ] Document build and deployment process
  **Completed:** ___________

- [ ] Document story creation workflow
  **Completed:** ___________

- [ ] Document image optimization process
  **Completed:** ___________

- [ ] Create CONTRIBUTING.md guidelines
  **Completed:** ___________

### Launch
- [ ] Run final Lighthouse audit
  **Completed:** ___________

- [ ] Fix any critical issues
  **Completed:** ___________

- [ ] Deploy to production
  **Completed:** ___________

- [ ] Verify production site functionality
  **Completed:** ___________

- [ ] Share site with initial testers
  **Completed:** ___________

---

## Newly Discovered Tasks

- [ ] Create script to process SOURCE FILES portraits to /public/images/stories/
  **Reason:** Need to optimize 8 existing .png portraits from SOURCE FILES folder (BarabelMercenary.png, ChadraFanPilot.png, F1X-3R.png, HumanAcePilot.png, LongClaw.png, RhodianScoundral.png, VerpineOperative.png, ZabrakJedi.png)
  **Discovered during:** Session 2 - User informed that source data is in SOURCE FILES folder

- [ ] Update task: Convert .docx files (not PDFs) from SOURCE FILES to MDX
  **Reason:** Source files are .docx format, not PDFs as originally specified in PLANNING.md
  **Discovered during:** Session 2 - SOURCE FILES inventory shows 8 .docx files (Bilar Saruun, Cheedo, Dakk, F1X-3R, Kaa'Reth, Long Claw, Ragath, Tekli)

---

## Next 5 Tasks to Run

Based on the current project state (11 tasks complete from Milestone 1), here are the immediate next steps:

1. **Create `/src/content/stories/` directory**
   Set up content collections directory structure for MDX story files

2. **Define Zod schema for story frontmatter**
   Create schema matching PRD spec with fields: title, slug, character, species, affiliation, era, tags, ship, portrait, summary

3. **Register stories collection in Astro config**
   Configure content collections in astro.config.mjs with Zod schema

4. **Create `/public/images/stories/` directory**
   Set up directory for optimized portrait images

5. **Create script to process SOURCE FILES portraits**
   Build image optimization script to convert .png files from SOURCE FILES to WebP format (600×800)
