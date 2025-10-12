#!/usr/bin/env node

/**
 * Image Optimization Script for ICSD
 * Converts PNG portraits from SOURCE FILES to WebP format (600×800)
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SOURCE_DIR = join(__dirname, '..', 'SOURCE FILES');
const TARGET_DIR = join(__dirname, '..', 'public', 'images', 'stories');
const TARGET_WIDTH = 600;
const TARGET_HEIGHT = 800;
const WEBP_QUALITY = 85;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Convert filename to kebab-case for web-friendly URLs
 * Example: "BarabelMercenary" -> "barabel-mercenary"
 */
function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Process a single image file
 */
async function processImage(sourceFile, targetFile) {
  try {
    await sharp(sourceFile)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(targetFile);

    return true;
  } catch (error) {
    console.error(`   ${colors.red}❌ Error:${colors.reset} ${error.message}`);
    return false;
  }
}

/**
 * Main optimization function
 */
async function optimizeImages() {
  console.log(`${colors.green}🖼️  ICSD Image Optimization${colors.reset}`);
  console.log('================================\n');

  // Ensure target directory exists
  try {
    await mkdir(TARGET_DIR, { recursive: true });
  } catch (error) {
    console.error(`${colors.red}❌ Error creating target directory:${colors.reset} ${error.message}`);
    process.exit(1);
  }

  // Read source directory
  let files;
  try {
    files = await readdir(SOURCE_DIR);
  } catch (error) {
    console.error(`${colors.red}❌ Error reading SOURCE FILES directory:${colors.reset} ${error.message}`);
    process.exit(1);
  }

  // Filter for PNG files
  const pngFiles = files.filter(file => extname(file).toLowerCase() === '.png');

  if (pngFiles.length === 0) {
    console.log(`${colors.yellow}⚠️  No PNG files found in SOURCE FILES${colors.reset}`);
    return;
  }

  console.log(`${colors.yellow}Processing ${pngFiles.length} images from SOURCE FILES...${colors.reset}\n`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of pngFiles) {
    const sourceFile = join(SOURCE_DIR, file);
    const filename = basename(file, '.png');
    const webFilename = toKebabCase(filename);
    const targetFile = join(TARGET_DIR, `${webFilename}.webp`);

    // Check if file needs processing
    try {
      const [sourceStat, targetStat] = await Promise.all([
        stat(sourceFile),
        stat(targetFile).catch(() => null),
      ]);

      if (targetStat && targetStat.mtime > sourceStat.mtime) {
        console.log(`⏭️  ${colors.yellow}Skipping${colors.reset} ${filename} (already optimized)`);
        skipped++;
        continue;
      }

      console.log(`🔄 ${colors.yellow}Processing${colors.reset} ${filename}...`);

      const success = await processImage(sourceFile, targetFile);

      if (success) {
        const [sourceSize, targetSize] = await Promise.all([
          stat(sourceFile).then(s => s.size),
          stat(targetFile).then(s => s.size),
        ]);

        const savings = ((sourceSize - targetSize) / sourceSize * 100).toFixed(1);

        console.log(
          `   ✅ ${colors.green}Success:${colors.reset} ${webFilename}.webp ` +
          `(${formatBytes(sourceSize)} → ${formatBytes(targetSize)}, ${savings}% smaller)\n`
        );
        processed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`   ${colors.red}❌ Failed:${colors.reset} ${error.message}\n`);
      failed++;
    }
  }

  // Summary
  console.log('================================');
  console.log(`${colors.green}✨ Optimization Complete${colors.reset}`);
  console.log(`   Processed: ${processed} images`);
  console.log(`   Skipped: ${skipped} images`);
  if (failed > 0) {
    console.log(`   Failed: ${failed} images`);
  }
  console.log(`   Output: ${TARGET_DIR}/\n`);
}

// Run the script
optimizeImages().catch(error => {
  console.error(`${colors.red}❌ Fatal error:${colors.reset} ${error.message}`);
  process.exit(1);
});
