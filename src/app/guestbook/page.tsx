import type { Metadata } from 'next';

import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { ROUTES } from '@/constants/routes';
import Guestbook from '@/features/guestbook/components/guestbook';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Guestbook',
  description:
    'Feel free to share your suggestions, appreciation, questions, or anything else on your mind.',
  url: ROUTES.guestbook,
});

const GuestbookPage = () => {
  return (
    <>
      <PageHeader
        title="Guestbook"
        description="Feel free to share your suggestions, appreciation, questions, or anything else on your mind."
      />
      <Container>
        <Guestbook />
      </Container>
    </>
  );
};

export default GuestbookPage;
