import type { Metadata } from 'next';

import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import AwardsSection from '@/features/resume/components/awards-section';
import CareerJourney from '@/features/resume/components/career-journey';
import CertificationsSection from '@/features/resume/components/certifications-section';
import ResumeStats from '@/features/resume/components/resume-stats';
import SkillsSection from '@/features/resume/components/skills-section';
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

      <Container className="space-y-4 md:space-y-12">
        <ResumeStats />

        <Separator />

        <SkillsSection />

        <Separator />

        <CareerJourney header={true} />

        <Separator />

        <CertificationsSection />

        <Separator />

        <AwardsSection />
      </Container>
    </>
  );
};

export default ResumePage;
