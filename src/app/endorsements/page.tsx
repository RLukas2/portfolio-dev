import type { Metadata } from 'next';

import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { ROUTES } from '@/constants/routes';
import Endorsements from '@/features/endorsements/components/endorsements';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Endorsements',
  description:
    'Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me.',
  url: ROUTES.endorsements,
});

// Revalidate every 2 minutes - endorsements don't change frequently
export const revalidate = 120;

const EndorsementsPage = async () => {
  return (
    <>
      <PageHeader
        title="Endorsements"
        description="Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me. Your valued endorsement is highly appreciated and will contribute significantly to showcasing my proficiency."
      />
      <Container>
        <Endorsements />
      </Container>
    </>
  );
};

export default EndorsementsPage;
