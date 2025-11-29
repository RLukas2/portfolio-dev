'use client';

import Container from '@/components/core/container';
import ContentEngagements from '@/features/content/components/content-engagements';
import Mdx from '@/features/content/components/mdx/mdx';
import TableOfContents from '@/features/content/components/table-of-contents';

import { usePostContext } from './post-provider';

const PostContent = () => {
  const { slug, code, headings } = usePostContext();

  // If there is no headings, just return the main content
  if (!headings || headings === '[]') {
    return (
      <section>
        <Container>
          <Mdx code={code} className="mt-8" />
          <ContentEngagements slug={slug} />
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container wide>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <Mdx code={code} className="mt-8" />
            <ContentEngagements slug={slug} />
          </div>

          {/* Table of Contents Sidebar - Desktop only, mobile uses floating button */}
          {headings && (
            <aside className="hidden lg:block lg:w-64 lg:shrink-0">
              <div className="sticky top-24 rounded-2xl border border-dashed p-6">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </Container>

      {/* Mobile ToC floating button - rendered outside container */}
      {headings && <TableOfContents headings={headings} />}
    </section>
  );
};

export default PostContent;
