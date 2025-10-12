#!/usr/bin/env node

/**
 * Story Conversion Script for ICSD
 * Converts .docx files from SOURCE FILES to MDX format with frontmatter
 * Usage: node scripts/convert-stories.js
 */

import mammoth from 'mammoth';
import { readdir, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '..', 'SOURCE FILES');
const TARGET_DIR = join(__dirname, '..', 'src', 'content', 'stories');

// Map story filenames to their portrait images and metadata
const storyMappings = {
  'Bilar Saruun': {
    slug: 'bilar-saruun',
    portrait: '/images/stories/zabrak-jedi.webp',
    summary: 'Padawan survivor living under an alias; searching for Master Koras.',
  },
  'Cheedo': {
    slug: 'cheedo',
    portrait: '/images/stories/chadra-fan-pilot.webp',
    summary: 'Skilled pilot and mechanic serving the Rebel Alliance.',
  },
  'Dakk': {
    slug: 'dakk',
    portrait: '/images/stories/barabel-mercenary.webp',
    summary: 'Barabel mercenary and warrior for hire.',
  },
  'F1X-3R': {
    slug: 'f1x-3r',
    portrait: '/images/stories/f1-x-3-r.webp',
    summary: 'Protocol droid with extensive linguistic capabilities.',
  },
  "Kaa'Reth": {
    slug: 'kaa-reth',
    portrait: '/images/stories/rhodian-scoundral.webp',
    summary: 'Rodian scoundrel and smuggler navigating the underworld.',
  },
  'Long Claw': {
    slug: 'long-claw',
    portrait: '/images/stories/long-claw.webp',
    summary: 'Wookiee warrior seeking redemption and purpose.',
  },
  'Ragath': {
    slug: 'ragath',
    portrait: '/images/stories/verpine-operative.webp',
    summary: 'Verpine technician and operative for the Rebellion.',
  },
  'Tekli': {
    slug: 'tekli',
    portrait: '/images/stories/human-ace-pilot.webp',
    summary: 'Ace pilot and squadron leader in the Rebel Alliance.',
  },
  'Kestrel': {
    slug: 'kestrel',
    portrait: '/images/stories/kestrel.webp',
    summary: 'ISB analyst with a hidden agenda and dangerous secrets.',
  },
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Convert filename to character name
 */
function getCharacterName(filename) {
  return basename(filename, '.docx');
}

/**
 * Convert .docx to plain text only (strip all images and formatting)
 */
async function extractTextFromDocx(filePath) {
  try {
    // Extract text only, no markdown, no images
    const result = await mammoth.extractRawText({ path: filePath });

    // Clean up excessive whitespace and newlines
    let cleanText = result.value
      .replace(/\n{3,}/g, '\n\n') // Reduce multiple newlines to double
      .trim();

    return cleanText;
  } catch (error) {
    console.error(`${colors.red}Error extracting text:${colors.reset}`, error.message);
    return null;
  }
}

/**
 * Generate MDX frontmatter
 */
function generateFrontmatter(character, metadata) {
  const today = new Date().toISOString().split('T')[0];

  const frontmatterLines = [
    '---',
    `title: ${character}`,
    `character: ${character}`,
    `lastUpdated: ${today}`,
    `portrait: ${metadata.portrait}`,
    `summary: ${metadata.summary}`,
    '---',
    ''
  ];

  return frontmatterLines.join('\n');
}

/**
 * Convert a single story
 */
async function convertStory(sourceFile) {
  const character = getCharacterName(sourceFile);
  const metadata = storyMappings[character];

  if (!metadata) {
    console.log(`${colors.yellow}⚠️  Skipping${colors.reset} ${character} (no metadata mapping)`);
    return false;
  }

  console.log(`🔄 ${colors.yellow}Converting${colors.reset} ${character}...`);

  const sourcePath = join(SOURCE_DIR, sourceFile);
  const content = await extractTextFromDocx(sourcePath);

  if (!content) {
    console.log(`   ${colors.red}❌ Failed${colors.reset} to extract content`);
    return false;
  }

  // Generate MDX file
  const frontmatter = generateFrontmatter(character, metadata);
  const mdxContent = frontmatter + '\n' + content;

  // Write to target directory
  const targetPath = join(TARGET_DIR, `${metadata.slug}.mdx`);
  await writeFile(targetPath, mdxContent, 'utf-8');

  console.log(`   ✅ ${colors.green}Success:${colors.reset} ${metadata.slug}.mdx`);
  return true;
}

/**
 * Main conversion function
 */
async function convertAllStories() {
  console.log(`${colors.green}📚 ICSD Story Conversion${colors.reset}`);
  console.log('================================\n');

  let files;
  try {
    files = await readdir(SOURCE_DIR);
  } catch (error) {
    console.error(`${colors.red}❌ Error reading SOURCE FILES:${colors.reset} ${error.message}`);
    process.exit(1);
  }

  const docxFiles = files.filter(file => file.endsWith('.docx'));

  if (docxFiles.length === 0) {
    console.log(`${colors.yellow}⚠️  No .docx files found in SOURCE FILES${colors.reset}`);
    return;
  }

  console.log(`${colors.yellow}Converting ${docxFiles.length} stories...${colors.reset}\n`);

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of docxFiles) {
    const success = await convertStory(file);
    if (success) {
      converted++;
    } else if (success === false) {
      failed++;
    } else {
      skipped++;
    }
    console.log('');
  }

  console.log('================================');
  console.log(`${colors.green}✨ Conversion Complete${colors.reset}`);
  console.log(`   Converted: ${converted} stories`);
  console.log(`   Skipped: ${skipped} stories`);
  if (failed > 0) {
    console.log(`   Failed: ${failed} stories`);
  }
  console.log(`   Output: ${TARGET_DIR}/\n`);
}

convertAllStories().catch(error => {
  console.error(`${colors.red}❌ Fatal error:${colors.reset} ${error.message}`);
  process.exit(1);
});
