/**
 * Sync all content-collections to database
 * Run this after building content-collections
 */

import type { ContentType } from '@prisma/client';
import {
  allPages,
  allPosts,
  allProjects,
  allShorts,
} from 'content-collections';

import db from '@/server/db';

async function syncContentToDatabase() {
  console.log('🔄 Syncing content to database...\n');

  const allContent: Array<{
    slug: string;
    type: ContentType;
    title: string;
    published: boolean;
    date: Date;
  }> = [];

  // Collect all posts
  allPosts.forEach((post) => {
    allContent.push({
      slug: post.slug,
      type: 'POST',
      title: post.title,
      published: post.published,
      date: new Date(post.date),
    });
  });

  // Collect all projects
  allProjects.forEach((project) => {
    allContent.push({
      slug: project.slug,
      type: 'PROJECT',
      title: project.title,
      published: project.published,
      date: new Date(project.date),
    });
  });

  // Collect all shorts
  allShorts.forEach((short) => {
    allContent.push({
      slug: short.slug,
      type: 'SHORT',
      title: short.title,
      published: short.published,
      date: new Date(short.date),
    });
  });

  // Collect all pages
  allPages.forEach((page) => {
    allContent.push({
      slug: page.slug,
      type: 'PAGE',
      title: page.title || page.slug,
      published: true,
      date: new Date(),
    });
  });

  console.log(`📊 Found ${allContent.length} content items:`);
  console.log(`   - Posts: ${allPosts.length}`);
  console.log(`   - Projects: ${allProjects.length}`);
  console.log(`   - Shorts: ${allShorts.length}`);
  console.log(`   - Pages: ${allPages.length}\n`);

  // Sync to database
  let succeeded = 0;
  let failed = 0;

  for (const item of allContent) {
    try {
      await db.contentMeta.upsert({
        where: { slug: item.slug },
        update: {
          type: item.type,
          title: item.title,
          published: item.published,
          publishedAt: item.published ? item.date : null,
          updatedAt: new Date(),
        },
        create: {
          slug: item.slug,
          type: item.type,
          title: item.title,
          published: item.published,
          publishedAt: item.published ? item.date : null,
        },
      });
      succeeded++;
    } catch (error) {
      console.error(`❌ Failed to sync: ${item.slug}`, error);
      failed++;
    }
  }

  console.log(`\n✅ Synced ${succeeded} items`);
  if (failed > 0) {
    console.log(`❌ Failed ${failed} items`);
  }

  // Clean up deleted content
  const existingSlugs = allContent.map((c) => c.slug);
  const deletedCount = await db.contentMeta.updateMany({
    where: {
      slug: { notIn: existingSlugs },
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (deletedCount.count > 0) {
    console.log(`🗑️  Soft-deleted ${deletedCount.count} removed content items`);
  }

  console.log('\n✨ Content sync complete!');
}

// Run sync
syncContentToDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  });
