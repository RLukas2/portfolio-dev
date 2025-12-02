import { DownloadIcon, FileTextIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import Link from '@/components/common/link';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import Biography from '@/features/about/components/biography';
import OpenForHire from '@/features/about/components/open-for-hire';
import CareerJourney from '@/features/resume/components/career-journey';
import env from '@/lib/env';
import { buildPersonJsonLd, seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'About',
  description: 'Discover insights about me, my career journey, and more.',
  keywords: ['bio', 'biography', 'information', 'about'],
  url: ROUTES.about,
});

const AboutPage = () => {
  const isAvailableForHire = env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE || true;

  return (
    <>
      <PageHeader title="About" description="A short story of me." />
      <Container>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:gap-x-6">
          <div className="group flex flex-col items-center xl:sticky xl:top-24">
            <Image
              src={SITE.author.avatar}
              alt={SITE.author.name}
              width={256}
              height={256}
              placeholder="blur"
              blurDataURL="/media/rlukas/rlukas.jpg"
              className="rounded-full object-cover transition-all duration-300 hover:scale-105 xl:rounded-lg"
              quality={100}
            />
            <div className="m-0 flex flex-col items-center py-2">
              <h3 className="font-cal m-0 text-xl">{SITE.author.name}</h3>
              <h4 className="text-muted-foreground m-0">Software Engineer</h4>
            </div>
            <OpenForHire isOpenForHire={isAvailableForHire} />

            <div className="my-4 flex flex-row gap-4 md:flex-col">
              <Button asChild variant="shadow" size="sm" className="gap-x-1">
                <Link href={`${ROUTES.resume}/download`} target="_blank">
                  <DownloadIcon className="size-4" />
                  Download CV
                </Link>
              </Button>

              <Button asChild variant="shadow" size="sm" className="gap-x-1">
                <Link href={ROUTES.resume}>
                  <FileTextIcon className="size-4" />
                  View Resume
                </Link>
              </Button>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none xl:col-span-3">
            <Biography />

            <h2 className="font-cal">Career Journey</h2>
            <p className="text-muted-foreground m-0">
              A timeline of my professional experience and education.
            </p>

            <CareerJourney />
          </div>
        </div>
      </Container>

      {/* Person JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildPersonJsonLd(),
        }}
        key="person-jsonld"
      />
    </>
  );
};

export default AboutPage;
