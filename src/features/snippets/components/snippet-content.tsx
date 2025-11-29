'use client';

import Container from '@/components/core/container';
import ContentEngagements from '@/features/content/components/content-engagements';
import Mdx from '@/features/content/components/mdx/mdx';
import TableOfContents from '@/features/content/components/table-of-contents';

import { useSnippetContext } from './snippet-provider';

const SnippetContent = () => {
  const { slug, code, headings } = useSnippetContext();

  // If there is no headings, just return the main content
  if (!headings || headings === '[]') {
    return (
      <Container>
        <Mdx code={code} />
        <ContentEngagements slug={slug} />
      </Container>
    );
  }

  return (
    <>
      <Container wide>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <Mdx code={code} />
            <ContentEngagements slug={slug} />
          </div>

          {/* Table of Contents Sidebar - Desktop only */}
          {headings && (
            <aside className="hidden lg:block lg:w-64 lg:shrink-0">
              <div className="sticky top-24 rounded-2xl border border-dashed p-6">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </Container>

      {/* Mobile ToC floating button */}
      {headings && <TableOfContents headings={headings} />}
    </>
  );
};

export default SnippetContent;
