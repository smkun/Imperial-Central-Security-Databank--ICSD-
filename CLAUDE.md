# CLAUDE.md — AI Assistant Workflow Rules

This document defines the operational workflow for AI assistants working on the Imperial Central Security Databank project.

---

## Session Startup Protocol

### 1. Context Loading
**ALWAYS execute at the start of every session:**

```
1. Read PLANNING.md → Understand architecture, tech stack, decisions, risks
2. Read TASKS.md → Review milestone progress, identify next priority task
3. Check git status → Verify clean working tree or understand current changes
4. Review Session Log below → Understand recent work and context
```

### 2. Priority Assessment
After loading context, identify the highest-priority open task:

- **Priority order**: Follow milestone sequence (1 → 7)
- **Dependencies**: Skip tasks blocked by incomplete prerequisites
- **Logical grouping**: Prefer completing related tasks together (e.g., all "install" tasks)
- **User direction**: Always prioritize explicit user requests over autonomous task selection

---

## Task Execution Protocol

### Task Selection
1. Identify the highest-priority unchecked task from TASKS.md
2. Verify prerequisites are complete (check dependent tasks)
3. Announce task to user: "Starting: [task description]"
4. Execute task with focus and precision

### Task Completion
When a task is complete:

1. **Mark checkbox**: Change `- [ ]` to `- [x]` in TASKS.md
2. **Set completion date**: Add date in `Completed: YYYY-MM-DD` format (use today: 2025-10-12)
3. **Verify success**: Confirm task meets acceptance criteria
4. **Update only task line**: Do NOT rewrite entire file, use precise Edit tool

**Example edit:**
```diff
- - [ ] Install Tailwind CSS dependencies
-   **Completed:** ___________
+ - [x] Install Tailwind CSS dependencies
+   **Completed:** 2025-10-12
```

### New Task Discovery
When implementation reveals additional tasks:

1. **Add to "Newly Discovered Tasks" section** in TASKS.md
2. **Use atomic format**: `- [ ] [verb] [object]`
3. **Add one-line reason**: Explain why this task is necessary
4. **Reference source**: Note which task or milestone revealed this need

**Example:**
```markdown
## Newly Discovered Tasks

- [ ] Add TypeScript declaration file for TOCClient
  **Reason:** Build fails without type definitions for client script
  **Discovered during:** Milestone 4 - TOC implementation

- [ ] Install @astrojs/sitemap plugin
  **Reason:** Manual sitemap generation is error-prone and unmaintainable
  **Discovered during:** Milestone 5 - SEO tasks
```

---

## File Discipline

### Before Writing Any File

1. **Check if file exists**: Use Read or Glob to verify
2. **Read existing content**: ALWAYS read before editing
3. **Plan precise change**: Identify exact lines to modify
4. **Use Edit tool**: For existing files, NEVER use Write to recreate

### Change Scoping

**DO:**
- Modify only lines relevant to current task
- Preserve formatting and style of existing code
- Add minimal necessary code to complete task
- Test changes immediately after implementation

**DON'T:**
- Refactor unrelated code "while you're in there"
- Change formatting or style outside task scope
- Add features not in current task description
- Recreate entire files when editing a few lines

### File Operation Safety

- **Diff before write**: Show user changes before applying to critical files
- **Backup awareness**: Assume git is the backup, don't create `.bak` files
- **Atomic commits**: One logical change per commit
- **Reversibility**: Ensure all changes can be cleanly reverted

---

## Git Commit Protocol

### Commit Message Format

```
Short imperative subject (max 50 chars)

One-line explanation of why this change is needed.
Task: [Task description from TASKS.md]
```

**Examples:**

```
Add Tailwind config with Imperial colors

Provides project-specific color palette for consistent theming.
Task: Configure Tailwind with custom Imperial color tokens
```

```
Create story content collection schema

Defines type-safe frontmatter structure for MDX stories.
Task: Define Zod schema for story frontmatter
```

### Commit Timing

- **After each completed task**: Commit when task checkbox is marked
- **Logical checkpoints**: If task is large (>3 files), commit at sub-milestones
- **Before risky operations**: Commit clean state before experimental changes
- **User request**: Always commit when user explicitly asks

### Commit Safety

- **Never commit**: `.env`, `node_modules/`, build artifacts, OS files
- **Check git status**: Before committing, verify only intended files are staged
- **Verify .gitignore**: Ensure ignore rules are correct before first commit

---

## Session Closure Protocol

### End-of-Session Summary

When ending a work session, append a dated summary to the Session Log section below:

**Template:**
```markdown
### YYYY-MM-DD — [Session Focus]
**Tasks completed:** [count] ([milestone references])
**Key accomplishments:**
- [Accomplishment 1]
- [Accomplishment 2]

**Blockers/Issues:**
- [Any unresolved problems or decisions needed]

**Next session priorities:**
1. [Next task to start]
2. [Alternative if blocked]
```

**Example:**
```markdown
### 2025-10-12 — Project Initialization
**Tasks completed:** 5 (Milestone 1)
**Key accomplishments:**
- Initialized Astro project with TypeScript strict mode
- Installed and configured Tailwind CSS with Imperial color tokens
- Integrated MDX support for story content
- Installed Fuse.js search library

**Blockers/Issues:**
- Need to decide on pre-commit hook tool (husky vs. simple Git hook)

**Next session priorities:**
1. Configure TypeScript strict mode settings
2. Create BaseLayout.astro component
```

---

## Safety Rails

### Library Addition Protocol

**ALWAYS ask before installing new dependencies.**

When a task requires a new library:

1. **Pause execution**: Do not run `npm install` automatically
2. **Present 2 options**: Offer alternative approaches with trade-offs
3. **Wait for user choice**: Let user decide based on project priorities

**Template:**
```
⚠️  New dependency needed: [library-name]

**Option 1: [Library Name] (recommended)**
- Pros: [benefit 1], [benefit 2]
- Cons: [downside 1], [downside 2]
- Bundle size: [size] gzipped
- Maintenance: [active/stable/deprecated]

**Option 2: [Alternative approach]**
- Pros: [benefit 1], [benefit 2]
- Cons: [downside 1], [downside 2]
- Bundle size: [size if applicable]
- Complexity: [implementation effort]

Which approach should I use?
```

**Example:**
```
⚠️  New dependency needed: date-fns

**Option 1: date-fns (recommended)**
- Pros: Tree-shakeable, modern API, TypeScript support
- Cons: Adds ~5-10 KB per function used
- Bundle size: ~15 KB gzipped for typical usage
- Maintenance: Actively maintained, stable

**Option 2: Native Date + Intl API**
- Pros: Zero dependencies, built-in browser support
- Cons: Verbose syntax, inconsistent browser behavior
- Bundle size: 0 KB (native)
- Complexity: Higher implementation effort

Which approach should I use?
```

### Breaking Changes Warning

If a task requires changes that could break existing functionality:

1. **Warn user explicitly**: "⚠️ This change may affect [component/feature]"
2. **Suggest testing strategy**: Propose how to verify nothing breaks
3. **Offer rollback plan**: Explain how to revert if issues arise

---

## Session Log

### 2025-10-12 — Project Planning
**Tasks completed:** 0 (Pre-implementation)
**Key accomplishments:**
- Created PLANNING.md with comprehensive technical design
- Created TASKS.md with 167 atomic, testable tasks across 7 milestones
- Created CLAUDE.md with AI assistant workflow rules

**Blockers/Issues:**
- None - project scaffolding ready to begin

**Next session priorities:**
1. Initialize Astro project with TypeScript template
2. Install Tailwind CSS dependencies
3. Configure Tailwind with Imperial color tokens
4. Install MDX integration
5. Install Fuse.js search library

---

### 2025-10-12 — Initial Project Scaffold (Session 2)
**Tasks completed:** 11 (Milestone 1)
**Key accomplishments:**
- ✅ Initialized Astro project with TypeScript strict mode
- ✅ Installed and configured Tailwind CSS with Imperial color palette
- ✅ Integrated MDX support for story content
- ✅ Installed Fuse.js search library
- ✅ Created BaseLayout.astro with navigation, footer, SEO meta tags, and accessibility features
- ✅ Configured Imperial theme colors: bg (#0A0A0A), panel (#161A1D), line (#23272A), alert (#D93A3A), mute (#9AA0A6)
- ✅ Added skip-to-content link for accessibility
- ✅ Included scan-line divider visual flourish
- ✅ Documented SOURCE FILES location containing 8 story .docx files and 8 portrait .png files

**Source Data Inventory:**
- **Stories (8)**: Bilar Saruun, Cheedo, Dakk, F1X-3R, Kaa'Reth, Long Claw, Ragath, Tekli
- **Portraits (8)**: BarabelMercenary.png, ChadraFanPilot.png, F1X-3R.png, HumanAcePilot.png, LongClaw.png, RhodianScoundral.png, VerpineOperative.png, ZabrakJedi.png

**Blockers/Issues:**
- None

**Next session priorities:**
1. Set up content collections with Zod schema
2. Create image optimization script to process SOURCE FILES portraits
3. Convert first sample story (Bilar Saruun) from .docx to MDX
4. Test development server
5. Create 404 error page with Imperial theme

---

### 2025-10-12 — Content Collections Setup (Session 3)
**Tasks completed:** 5 (Milestone 2)
**Key accomplishments:**
- ✅ Created `/src/content/stories/` directory structure for MDX files
- ✅ Defined Zod schema with all PRD frontmatter fields (title, slug, character, species, affiliation, era, tags, ship, lastUpdated, portrait, summary, homeworld, authorNotes, linkedStories)
- ✅ Registered stories collection in `src/content/config.ts` with type-safe validation
- ✅ Created `/public/images/stories/` directory for optimized portraits
- ✅ Built `scripts/optimize-images.sh` for automated WebP conversion (600×800, 85% quality)

**Technical Details:**
- Content collections provide build-time validation and TypeScript types
- Zod schema matches PRD specification exactly
- Image script uses ImageMagick for PNG → WebP conversion
- Kebab-case filename transformation for web-friendly URLs
- Script includes progress indicators and file size comparisons

**Blockers/Issues:**
- None

**Next session priorities:**
1. Run optimize-images.sh to process 8 portraits from SOURCE FILES
2. Convert first .docx story (Bilar Saruun) to MDX
3. Create sample story to test content collection
4. Test development server with real content
5. Create StoryCard and StoryMeta components

---

## Quick Reference

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run check

# Format code
npm run format
```

### File Paths Quick Reference

- **Planning docs**: `PLANNING.md`, `TASKS.md`, `PRD.md`, `CLAUDE.md`
- **Source data**: `SOURCE FILES/` - Contains original .docx stories and .png portraits
- **Stories content**: `/src/content/stories/*.mdx` (to be created from SOURCE FILES)
- **Story images**: `/public/images/stories/` (optimized from SOURCE FILES)
- **Components**: `/src/components/`
- **Layouts**: `/src/layouts/`
- **Pages**: `/src/pages/`
- **Config**: `astro.config.mjs`, `tailwind.config.ts`, `tsconfig.json`

### Emergency Procedures

**If build fails:**
1. Check `npm run check` for TypeScript errors
2. Verify all imports have correct paths
3. Check Astro error messages in terminal
4. Consult Astro docs or PLANNING.md

**If git conflicts:**
1. Show conflicts to user immediately
2. Do NOT attempt auto-resolution
3. Explain conflict source clearly
4. Offer manual resolution guidance

**If task blocked:**
1. Document blocker in "Newly Discovered Tasks"
2. Move to next non-blocked task
3. Report blocker in session summary
4. Suggest resolution strategy for next session

---

## Rules Summary (TL;DR)

✅ **DO:**
- Read PLANNING.md and TASKS.md at session start
- Mark tasks complete with date when done
- Use Edit tool for existing files (never recreate)
- Commit after each completed task
- Ask before installing libraries (offer 2 options)
- Add session summary when ending work
- Scope changes to current task only

❌ **DON'T:**
- Skip context loading at session start
- Recreate entire files when editing
- Install dependencies without asking
- Refactor code outside current task
- Commit without checking git status
- End session without writing summary
- Make assumptions about user priorities
