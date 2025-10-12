# PLANNING.md — Imperial Central Security Databank

## Vision

Build a static Star Wars fan story archive with an Imperial aesthetic that makes player stories readable, searchable, and printable on the web. The site will feature fast client-side search, automatic character indexing from story metadata, and a dark, minimalist UI inspired by Imperial databases. Focus on simplicity, performance, and maintainability with zero server-side dependencies.

## Tech Stack

- **Astro** `^4.0.0` - Static site generator with content collections for MDX stories
- **Tailwind CSS** `^3.4.0` - Utility-first CSS framework for layout and Imperial theme
- **Fuse.js** `^7.0.0` - Lightweight fuzzy-search library for client-side story search
- **MDX** `^3.0.0` - Markdown with JSX for story content with frontmatter metadata
- **TypeScript** `^5.0.0` - Type safety for components and utilities
- **Node.js** `^18.0.0` (development only) - Build toolchain

## System Components and Boundaries

### Core Components

**Content Layer** (`/src/content/stories/*.mdx`)
- Boundary: MDX files with Zod-validated frontmatter containing story metadata (title, character, species, affiliation, era, tags, ship, portrait, summary)
- Responsibility: Single source of truth for all story content and metadata
- No business logic; purely data files consumed by Astro content collections

**Layout System** (`/src/layouts/`)
- `BaseLayout.astro`: Site-wide shell with navigation, footer, SEO meta tags
- `StoryLayout.astro`: Story-specific layout with TOC sidebar, reading progress bar, metadata display
- Boundary: Presentational components only; no data fetching or mutations

**Component Library** (`/src/components/`)
- `StoryCard.astro`: Reusable card component for story list display (grid/compact modes)
- `StoryMeta.astro`: Metadata row component (species, tags, ship) for story pages
- `TOCClient.ts`: Client-side table of contents generator from h2/h3 headings with "copy section link" functionality
- `SearchClient.ts`: Fuse.js wrapper with debounced input handling and result filtering
- Boundary: Self-contained UI components; no cross-component state sharing

**Page Routes** (`/src/pages/`)
- `/index.astro`: Home page with site introduction and latest stories
- `/stories/index.astro`: Story list with search and filter UI
- `/stories/[slug].astro`: Dynamic story detail page with TOC and reading features
- `/characters/index.astro`: Optional character index derived from story frontmatter
- `/about.astro`: Fan project disclaimer and information
- Boundary: Each page is independently routable; no client-side routing

**Search System** (client-side only)
- Build-time: Generate JSON search index from all story frontmatter
- Runtime: Load Fuse.js, hydrate search index, filter on `title`, `character`, `tags`, `summary`
- Boundary: < 60 KB gzipped JavaScript total; no server queries

### Component Interaction Flow

```
User Request → Astro SSG Build → Static HTML/CSS/JS → Browser
                    ↓
         Content Collections (MDX) → Zod Schema Validation
                    ↓
         Component Rendering → Tailwind CSS Classes
                    ↓
         Search Index Generation → JSON output
                    ↓
         Client Hydration → Fuse.js + Vanilla JS
```

## External Services and Data Flow

**No external runtime dependencies** - This is a fully static site with zero API calls or third-party services during user browsing.

### Build-Time Data Flow

```
[Story MDX Files]
    → Astro Content Collections API
    → Zod Schema Validation
    → Build-time page generation
    → Search index JSON generation
    → Static HTML/CSS/JS output

[Portrait Images]
    → /public/images/stories/
    → WebP optimization (600×800)
    → Static file serving
```

### Runtime Data Flow

```
[User visits /stories]
    → Load static HTML + search index JSON
    → Hydrate Fuse.js with index
    → User types in search box
    → Debounced search (client-side only)
    → Filter and display results (no network calls)

[User visits /stories/{slug}]
    → Load static story HTML
    → TOCClient.ts scans DOM for h2/h3
    → Build sticky sidebar TOC
    → Attach "copy link" handlers
    → Reading progress bar tracks scroll position
```

**No databases, no backends, no user accounts** - All data is baked into static files at build time. Search and filtering happen entirely in the browser.

## Technical Decisions and Rationale

### 1. Astro over Next.js/Gatsby
**Decision**: Use Astro for static site generation
**Rationale**: Astro's content collections provide excellent MDX + frontmatter DX with TypeScript validation. Zero-JS-by-default aligns with performance goals. No React runtime overhead for primarily static content (PRD.md:88-89).
**Trade-off**: Less ecosystem maturity than Next.js, but simpler for non-interactive content sites.

### 2. Client-side search with Fuse.js over server search
**Decision**: Build Fuse.js index at compile time, search in browser
**Rationale**: PRD explicitly requires "no database" and "no server-side anything" (PRD.md:11, 36). Fuse.js is < 20 KB gzipped and can handle 200+ stories under 100ms (PRD.md:123-125).
**Trade-off**: Search index grows with content, but at ~1-2 KB per story, 200 stories = ~200-400 KB JSON, acceptable for target use case.

### 3. MDX over plain Markdown
**Decision**: Use MDX for story content
**Rationale**: Allows embedded components if needed (e.g., custom callouts, image galleries) while maintaining readable Markdown syntax. Frontmatter supports structured metadata (PRD.md:40-54).
**Trade-off**: Slight parsing overhead vs. plain MD, but negligible for static builds.

### 4. Tailwind CSS over custom CSS
**Decision**: Use Tailwind utility classes with custom Imperial color tokens
**Rationale**: Rapid development, small production bundles via PurgeCSS, easy theme customization. PRD provides specific color palette (PRD.md:79) and design tokens (PRD.md:226-242).
**Trade-off**: Verbose HTML classes, but improved maintainability for small team/solo dev.

### 5. Vanilla JS over React/Vue for interactivity
**Decision**: Use plain TypeScript for search, TOC, copy-link, progress bar
**Rationale**: Minimal JS footprint (< 60 KB total per PRD.md:142). No framework overhead for simple interactions. Easier to reason about performance.
**Trade-off**: More manual DOM manipulation code, but scope is limited (4 small utilities).

### 6. WebP images at fixed dimensions
**Decision**: Standardize portraits to 600×800 WebP
**Rationale**: Avoid layout shift (PRD.md:144), reduce file sizes (WebP ~30% smaller than JPEG), consistent aspect ratio for card layouts.
**Trade-off**: Requires image preprocessing step, but acceptable for curated content.

### 7. Zod schema validation for frontmatter
**Decision**: Define strict Zod schema for story collection
**Rationale**: Catch metadata errors at build time, TypeScript autocomplete for frontmatter fields, self-documenting schema.
**Trade-off**: Slightly more boilerplate, but prevents runtime errors and content drift.

## Open Questions and Risks

### Open Questions

**Q1: Character index implementation strategy**
- **Question**: Should `/characters` be a single page or paginated? How should we group characters (alphabetically, by species, by affiliation)?
- **Next Steps**: Start with single-page alphabetical list. Implement pagination if character count exceeds ~50. Add filtering by species/affiliation as secondary feature.
- **Blocker**: None, can iterate post-v1.

**Q2: PDF migration workflow automation**
- **Question**: Manual or scripted PDF-to-MDX conversion? How to preserve formatting (italics, dialogue structure)?
- **Next Steps**: Create Python script using `pdfplumber` to extract text and basic structure. Manual cleanup for formatting. Document workflow in README.
- **Blocker**: Need sample PDFs to test extraction quality.

**Q3: Story versioning and updates**
- **Question**: How to handle story edits? Show revision history or just `lastUpdated` date?
- **Next Steps**: Start with `lastUpdated` frontmatter field only. Consider Git history links if version transparency becomes important.
- **Blocker**: None, can add later if needed.

**Q4: Mobile TOC behavior**
- **Question**: Sticky sidebar won't work on mobile. Collapsible TOC at top? Bottom sheet?
- **Next Steps**: Implement collapsible accordion TOC at top of story content for mobile breakpoints (< 768px). Desktop keeps sticky sidebar.
- **Blocker**: None, design exists in PRD UX notes.

**Q5: Linked stories navigation**
- **Question**: PRD mentions `linkedStories` frontmatter field (PRD.md:57). How should this display? Simple "Related Stories" list or more visual?
- **Next Steps**: Add "Related Stories" section at bottom of story page with StoryCard components for linked stories. Implement in milestone 4.
- **Blocker**: None, clear design path.

### Risks and Mitigation

**R1: PDF-to-MDX content drift** (PRD.md:169)
- **Risk**: Manual conversion errors or formatting loss during migration from PDF to MDX.
- **Impact**: Medium - Affects content fidelity and user trust.
- **Mitigation**: Include "Download original PDF" link on story pages. Keep PDFs in `/public/docs/{slug}.pdf` as source of truth. Automated diffing script to flag large text divergence.
- **Owner**: Content migration phase (Milestone 2).

**R2: Over-theming and scope creep** (PRD.md:170)
- **Risk**: Adding too many visual flourishes (scan lines, animations, custom fonts) slows development and bloats bundle size.
- **Impact**: Low - Delays launch but doesn't break functionality.
- **Mitigation**: Stick to PRD-defined design tokens (PRD.md:226-242). No custom fonts beyond Inter/Oswald/Roboto Mono. Defer animations to post-v1. Use Tailwind utilities exclusively.
- **Owner**: Development team discipline.

**R3: Image size and performance** (PRD.md:171)
- **Risk**: User-uploaded portraits vary wildly in size/format. Large images hurt Lighthouse performance score.
- **Impact**: High - Directly affects acceptance criteria (Performance ≥ 90, PRD.md:165).
- **Mitigation**: Enforce 600×800 WebP standard via build script. Create `scripts/optimize-images.sh` that auto-converts and resizes. Add pre-commit hook to validate image dimensions.
- **Owner**: Build tooling (Milestone 1).

**R4: Fuse.js index size growth**
- **Risk**: As story count grows (200+ stories), search index JSON could exceed browser memory limits on low-end devices.
- **Impact**: Low for v1 (few stories), High long-term.
- **Mitigation**: Monitor index size. If exceeds 500 KB, implement lazy loading (split index into chunks by era/affiliation). Consider Pagefind as alternative if Fuse.js scales poorly.
- **Owner**: Performance monitoring post-launch.

**R5: Accessibility compliance for custom UI**
- **Risk**: Custom search, filter chips, and copy-link buttons may not meet WCAG AA standards.
- **Impact**: Medium - Affects acceptance criteria (Accessibility ≥ 95, PRD.md:165).
- **Mitigation**: Use semantic HTML (`<button>`, `<input>`, `<nav>`). Test with screen reader (NVDA/VoiceOver). Add ARIA labels where needed. Lighthouse audit each milestone.
- **Owner**: Component development (all milestones).

**R6: Build time scaling**
- **Risk**: Astro builds slow down with 100+ MDX files.
- **Impact**: Low for v1, Medium long-term (developer experience).
- **Mitigation**: Profile builds at 50/100/200 story milestones. Enable Astro experimental content layer caching if available. Consider incremental builds via CI/CD caching.
- **Owner**: DevOps/CI setup.

## Next Steps

### Immediate Actions (Week 1)
1. **Scaffold Astro project** (Milestone 1, PRD.md:175-178)
   - Initialize Astro + Tailwind: `npm create astro@latest`
   - Configure Tailwind with Imperial color tokens (PRD.md:226-242)
   - Create BaseLayout.astro with navigation and footer
   - Set up content collection schema with Zod for `/src/content/stories`

2. **Define content schema** (Milestone 2, PRD.md:179-182)
   - Write Zod schema matching PRD frontmatter spec (PRD.md:40-54)
   - Add TypeScript types for story collection
   - Create two sample MDX stories for testing (convert Bilar "Bill" Saruun example from PRD.md:196-224)

3. **Implement image optimization pipeline** (mitigate R3)
   - Create `scripts/optimize-images.sh` using ImageMagick or Sharp
   - Add pre-commit Git hook to validate portrait dimensions
   - Document image requirements in CONTRIBUTING.md

### Short-Term Goals (Week 2-3)
4. **Build story list and search** (Milestone 3, PRD.md:183-186)
   - Implement `/stories/index.astro` with StoryCard grid
   - Integrate Fuse.js search with JSON index generation
   - Add filter chips for era, species, tags
   - Test search performance with 20+ sample stories

5. **Create story detail page** (Milestone 4, PRD.md:187-189)
   - Build StoryLayout.astro with sidebar TOC
   - Implement TOCClient.ts for dynamic TOC generation
   - Add copy-link and reading progress bar features
   - Design mobile-responsive TOC (collapsible accordion)

### Medium-Term Goals (Week 4)
6. **Polish and optimize** (Milestone 5, PRD.md:190-192)
   - Add print CSS for clean story printing
   - Generate OpenGraph images for social sharing
   - Create 404 page with Imperial theme
   - Run Lighthouse audits and fix issues

7. **PDF migration pilot** (address Q2)
   - Convert 5 existing PDF stories to MDX manually
   - Document conversion workflow
   - Create Python extraction script prototype
   - Validate content fidelity

### Long-Term Considerations (Post-Launch)
8. **Monitor and iterate**
   - Track Fuse.js index size as content grows (R4)
   - Gather user feedback on search and navigation
   - Consider optional character page enhancements (Q1)
   - Evaluate story versioning needs (Q3)

---

**File References**:
- Project requirements: [PRD.md](PRD.md)
- Content structure: [PRD.md:99-119](PRD.md#L99-L119)
- Visual design tokens: [PRD.md:226-242](PRD.md#L226-L242)
- Acceptance criteria: [PRD.md:160-166](PRD.md#L160-L166)
