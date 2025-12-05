/**
 * Post-build script to inline critical CSS using Beasties
 * Run after `next build` to optimize CSS delivery
 *
 * Beasties is the actively maintained fork of Critters
 * https://github.com/danielroe/beasties
 */

import Beasties from 'beasties';
import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';

const BEASTIES_OPTIONS = {
  // Inline critical CSS into the HTML
  inlineFonts: true,

  // Preload strategy for remaining CSS
  preload: 'swap',

  // Preload fonts
  preloadFonts: false,

  // Don't remove the original stylesheet links
  pruneSource: false,

  // Reduce the size of inlined CSS
  compress: true,

  // Log level
  logLevel: 'info',

  // Merge inlined styles into a single <style> tag
  mergeStylesheets: true,

  // Reduce layout shift by keeping external stylesheets
  reduceInlineStyles: true,
};

async function findHtmlFiles(dir) {
  const htmlFiles = [];

  try {
    const entries = await readdir(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        const nestedFiles = await findHtmlFiles(fullPath);
        htmlFiles.push(...nestedFiles);
      } else if (entry.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return htmlFiles;
}

async function processHtmlFile(beasties, filePath) {
  try {
    const html = await readFile(filePath, 'utf-8');

    // Skip if already processed
    if (html.includes('data-beasties-processed')) {
      console.log(`  ⏭️  Skipping (already processed): ${filePath}`);
      return 'skipped';
    }

    const processed = await beasties.process(html);

    // Add marker to prevent re-processing
    const markedHtml = processed.replace(
      '<html',
      '<html data-beasties-processed="true"',
    );

    await writeFile(filePath, markedHtml, 'utf-8');
    console.log(`  ✅ Processed: ${filePath}`);
    return 'processed';
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return 'error';
  }
}

async function main() {
  const startTime = Date.now();
  console.log('\n🐾 Beasties - Critical CSS Inlining\n');

  // Next.js output directories to check
  const outputDirs = ['.next/server/app', '.next/server/pages', 'out'];

  const beasties = new Beasties({
    ...BEASTIES_OPTIONS,
    // Next.js serves static files from .next/static but references them as /_next/static
    // We need to map the public path to the actual filesystem path
    path: join(process.cwd(), '.next'),
    publicPath: '/_next/',
  });

  const stats = { processed: 0, skipped: 0, errors: 0 };

  for (const dir of outputDirs) {
    const fullDir = join(process.cwd(), dir);
    console.log(`📁 Scanning: ${dir}`);

    const htmlFiles = await findHtmlFiles(fullDir);

    if (htmlFiles.length === 0) {
      console.log(`   No HTML files found\n`);
      continue;
    }

    console.log(`   Found ${htmlFiles.length} HTML file(s)\n`);

    for (const file of htmlFiles) {
      const result = await processHtmlFile(beasties, file);
      stats[result]++;
    }

    console.log('');
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('📊 Summary:');
  console.log(`   Processed: ${stats.processed}`);
  console.log(`   Skipped: ${stats.skipped}`);
  console.log(`   Errors: ${stats.errors}`);
  console.log(`   Duration: ${duration}s\n`);
}

main().catch(console.error);
