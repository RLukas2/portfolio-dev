'use client';

import { Card } from '@/components/common/card';
import PageHeader from '@/components/common/page-header';
import Container from '@/components/core/container';
import { Button } from '@/components/ui/button';
import WidgetGrid from '@/features/sandbox/components/widget-grid';

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

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card flex h-40 items-center justify-center">
            <span>Card 1</span>
          </Card>
          <Card
            className="card flex h-40 items-center justify-center"
            mouseEffect
          >
            <span>Card 2 with mouseEffect</span>
          </Card>
          <Card
            className="card flex h-40 items-center justify-center"
            mouseEffect
            compact
          >
            <span>Card 3 with mouseEffect and compact</span>
          </Card>
        </div>

        <WidgetGrid className="mt-8" />
      </Container>
    </>
  );
};

export default SandboxPage;
