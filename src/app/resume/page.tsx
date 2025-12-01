import type { Metadata } from 'next';

import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { ROUTES } from '@/constants/routes';
import CareerJourney from '@/features/resume/components/career-journey';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Resume',
  description: 'Check out how my journey have been like over the years',
  keywords: ['resume', 'biography', 'cv'],
  robots: { index: false, follow: false },
  url: ROUTES.resume,
});

const ResumePage = () => {
  return (
    <>
      <PageHeader
        title="Resume"
        description="A brief overview of my professional journey and career milestones."
      />
      <Container>
        <CareerJourney header={true} downloadButton={true} />
      </Container>
    </>
  );
};

export default ResumePage;
