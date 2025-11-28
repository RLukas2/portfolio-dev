'use client';

import Container from '@/components/core/container';
import ContentEngagements from '@/features/content/components/content-engagements';
import Mdx from '@/features/content/components/mdx/mdx';

import { useProjectContext } from './project-provider';

const ProjectContent = () => {
  const { slug, code } = useProjectContext();

  return (
    <section>
      <Container>
        <Mdx code={code} className="mt-8" />
        <ContentEngagements slug={slug} />
      </Container>
    </section>
  );
};

export default ProjectContent;
