# PRD — Imperial Central Security Databank (stories-first)

## 1) Goal

Make your player stories readable and searchable on the web. Use Astro, Tailwind CSS, and a tiny bit of JavaScript. Keep the Imperial vibe. Keep it simple.

## 2) What we’re building

* Static site with a **Stories** section.
* Optional auto-built **Characters** index.
* Fast on-page search. No accounts. No database.

## 3) Scope (v1)

* Pages:

  * `/` Home: site intro + latest stories.
  * `/stories` List of all stories with filters.
  * `/stories/{slug}` Story detail.
  * `/characters` Index from story metadata (optional toggle).
  * `/about` Fan project note.
* Content:

  * Stories in MDX files with frontmatter.
  * One portrait per story.
* Features:

  * Title search and tag filters.
  * Reading progress bar and “copy link to section.”
  * Print-friendly layout.

## 4) Out of scope (v1)

* Casefiles, assets, bounty tables.
* User submissions.
* Server-side anything.

## 5) Content model

**Story (MDX frontmatter)**

```yaml
title: Bilar “Bill” Saruun
slug: bilar-saruun
character: Bilar "Bill" Saruun
species: Zabrak
affiliation: Independent
era: Imperial
tags: [padawan, survivor, yt-1300 crew]
ship: YT-1300 (crew)
lastUpdated: 2025-10-12
portrait: /images/stories/bilar.jpg
summary: Padawan survivor living under an alias; searching for Master Koras.
```

* Body: Markdown story text. Use `###` headings for sections.
* Optional fields: `homeworld`, `authorNotes`, `linkedStories: [slug]`.

**Character index (derived)**

* Built from Story frontmatter. No separate files needed.

## 6) UX notes

* Story page:

  * Title, meta row (species, tags, ship).
  * Sticky sidebar with in-page headings.
  * “Copy section link” button.
  * Reading width ~65ch. Large, legible font.
* List page:

  * Search box (title, character, tags).
  * Filter chips: Era, Species, Tag.
  * Grid or compact list toggle.

## 7) Visual style

* Palette: #0A0A0A, #161A1D, #23272A, #D93A3A (sparingly), #9AA0A6.
* Type: Inter (body), Oswald or Orbitron (labels), Roboto Mono (IDs).
* Flavor:

  * Subtle scan-line divider at top of story pages.
  * Section labels in small caps.
  * “Unauthorized access logged” footer note.

## 8) Tech stack

* **Astro** with content collections for `stories`.
* **Tailwind CSS** for layout and utilities.
* **Vanilla JS** for:

  * Fuse.js client search.
  * Copy-to-clipboard.
  * Reading progress bar.

## 9) File structure

```
/src
  /content
    /stories/*.mdx
  /components
    StoryCard.astro
    StoryMeta.astro
    TOCClient.ts
    SearchClient.ts
  /layouts
    BaseLayout.astro
    StoryLayout.astro
  /pages
    index.astro
    stories/index.astro
    stories/[slug].astro
    characters/index.astro   # optional
/public/images/stories
tailwind.config.ts
astro.config.mjs
```

## 10) Search behavior

* Fuse.js index built at runtime from a small JSON generated at build.
* Fields: `title`, `character`, `tags`, `summary`.
* Debounced input. Results update under 100 ms on 200+ items.

## 11) Accessibility

* High contrast text.
* Keyboard focus states on search, chips, and “copy link.”
* Skip-to-content link.
* Alt text for portraits.

## 12) SEO

* `<title>ICSD — {Story Title}</title>`
* OpenGraph image per story (fallback card).
* Sitemap, robots.txt.

## 13) Performance guardrails

* JS < 60 KB gzip (Fuse + tiny utilities).
* CSS < 60 KB gzip.
* Images as WebP with fixed dimensions to avoid layout shift.

## 14) Editorial workflow

* Create a new `.mdx` in `/src/content/stories`.
* Add frontmatter. Drop a portrait into `/public/images/stories`.
* Use `###` headings to auto-build a TOC.
* Commit. Deploy.

## 15) Migration from your PDFs

* Convert each PDF story to MDX. Keep original phrasing and section breaks.
* Map basic metadata from the text into frontmatter.
* Example: your Bilar “Bill” Saruun story becomes `/stories/bilar-saruun.mdx`. 
* Keep the PDF in `/public/docs` if you want a “Download original” link.

## 16) Acceptance criteria (v1)

* I can add a story MDX and see it on `/stories` and `/stories/{slug}`.
* Search returns expected matches by title and tags.
* Print view removes chrome and prints clean text and images.
* Lighthouse: Performance ≥ 90, Accessibility ≥ 95.

## 17) Risks

* PDF-to-MDX drift: keep a “Download original” link for reference.
* Over-theming: stick to tokens and utilities.
* Image sizes: standardize portraits to 600 × 800 WebP.

## 18) Milestones

1. **Scaffold**

   * Astro + Tailwind wired.
   * Base layout and nav.
2. **Stories collection**

   * Zod schema.
   * Two sample stories converted.
3. **List + search**

   * `/stories` with Fuse.js.
   * Filter chips.
4. **Story detail**

   * TOC, copy-link, progress bar.
5. **Polish**

   * Print CSS, OG images, 404.

---

### Example story MDX (Bilar “Bill” Saruun)

```mdx
---
title: Bilar “Bill” Saruun
slug: bilar-saruun
character: Bilar "Bill" Saruun
species: Zabrak
affiliation: Independent
era: Imperial
tags: [padawan, survivor, yt-1300 crew]
ship: YT-1300 (crew)
lastUpdated: 2025-10-12
portrait: /images/stories/bilar.jpg
summary: Padawan survivor living under an alias; searching for Master Koras.
---

### Maintenance Shafts
The maintenance shaft was three meters wide... *(paste your text here, keep headings like this for sections)*

### Running and Hiding
...

### The Message
...

### Decision
...
```

### Minimal Tailwind tokens (drop into `tailwind.config.ts`)

```ts
theme: {
  extend: {
    colors: {
      ic: {
        bg: '#0A0A0A',
        panel: '#161A1D',
        line: '#23272A',
        alert: '#D93A3A',
        mute: '#9AA0A6'
      }
    }
  }
}
```

### Tiny TOC and copy-link script (concept)

```ts
// TOCClient.ts
export function buildTOC() {
  const headings = [...document.querySelectorAll('main h2, main h3')].map(h => ({
    id: h.id || (h.id = h.textContent!.toLowerCase().replace(/\s+/g, '-')),
    text: h.textContent!,
    level: h.tagName
  }));
  // Render into a sidebar element; add click handlers to copy links
}
```

---

If you want, I’ll spin a starter Astro repo with:

* The content collection and Zod schema.
* `/stories` list with Fuse.js.
* A ready story page using the layout above.
* One sample MDX using your Bilar text.
