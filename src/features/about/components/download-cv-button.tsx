'use client';

import { DownloadIcon } from 'lucide-react';

import Link from '@/components/common/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { trackDownload } from '@/lib/analytics';

const DownloadCVButton = () => {
  const handleDownload = () => {
    trackDownload('resume.pdf');
  };

  return (
    <Button
      asChild
      variant="shadow"
      className="gap-x-2"
      onClick={handleDownload}
    >
      <Link href={`${ROUTES.resume}/download`} target="_blank">
        <DownloadIcon className="size-4" />
        Download CV
      </Link>
    </Button>
  );
};

export default DownloadCVButton;
