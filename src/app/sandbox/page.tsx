'use client';

import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Button } from '@/components/ui/button';

const SandboxPage = () => {
  return (
    <>
      <PageHeader
        title="Sandbox"
        description="A playground for experimentation."
      />
      <Container>
        <div>
          {/* Test Sentry Error Button */}
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              throw new Error('Test Sentry Error');
            }}
          >
            Trigger Sentry Error
          </Button>
        </div>
      </Container>
    </>
  );
};

export default SandboxPage;
