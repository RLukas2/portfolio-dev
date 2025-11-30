'use client';

import Container from '@/components/core/container';
import Mdx from '@/features/content/components/mdx/mdx';
import TableOfContents from '@/features/content/components/table-of-contents';

import type { ContentBodyProps } from '../../types/content';
import ContentEngagements from '../content-engagements';

const ContentBody = ({
  slug,
  code,
  headings,
  engagements = true,
}: ContentBodyProps) => {
  // If there is no headings, just return the main content
  if (!headings || headings === '[]') {
    return (
      <section>
        <Container wide>
          <Mdx code={code} className="mt-8" />
          {engagements && <ContentEngagements slug={slug} />}
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container wide>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <Mdx code={code} />
            {engagements && <ContentEngagements slug={slug} />}
          </div>
          {/* Table of Contents Sidebar - Desktop only */}
          {headings && (
            <aside className="hidden lg:block lg:w-64 lg:shrink-0 print:hidden">
              <div className="sticky top-24 max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-dashed p-6">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </Container>

      {/* Mobile ToC floating button - hidden on desktop */}
      {headings && (
        <div className="lg:hidden print:hidden">
          <TableOfContents headings={headings} />
        </div>
      )}
    </section>
  );
};

export default ContentBody;
