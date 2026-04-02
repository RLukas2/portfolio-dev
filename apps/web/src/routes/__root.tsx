import { PostHogProvider } from '@posthog/react';
import { type QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import { createIsomorphicFn } from '@tanstack/react-start';
import { DevtoolsComponent } from '@xbrk/shared/dev-tools';
import { ThemeProvider, useTheme } from '@xbrk/shared/theme-provider';
import { Toaster } from '@xbrk/ui/sonner';
import posthog from 'posthog-js';
import { env } from '@/lib/env/client';
import appCss from '@/style.css?url';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
        as: 'style',
        type: 'text/css',
      },
    ],
  }),
  staleTime: Number.POSITIVE_INFINITY,
  shellComponent: ({ children }) => {
    return (
      <ThemeProvider>
        <ShellComponent>{children}</ShellComponent>
      </ThemeProvider>
    );
  },
});

/// === PostHog ===

const VITE_POSTHOG_KEY = env.VITE_POSTHOG_KEY;
const VITE_POSTHOG_HOST = env.VITE_POSTHOG_HOST;

const initPostHog = createIsomorphicFn().client(() => {
  if (!(VITE_POSTHOG_KEY && VITE_POSTHOG_HOST)) {
    console.warn('PostHog is not initialized because VITE_POSTHOG_KEY or VITE_POSTHOG_HOST is not set');

    return;
  }

  posthog.init(VITE_POSTHOG_KEY, {
    api_host: VITE_POSTHOG_HOST,
    defaults: '2025-11-30',
    cookieless_mode: 'on_reject',
    disable_external_dependency_loading: true,
  });
});

initPostHog();

/// === Shell ===

function ShellComponent({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>

      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <PostHogProvider client={posthog}>
          {children}

          <Toaster resolvedTheme={resolvedTheme} />

          {import.meta.env.DEV && <DevtoolsComponent />}

          {/* 
          <ClientOnly>
            Add a cookie banner here to comply with GDPR and other privacy regulations. This will only be rendered on the client side since it relies on browser APIs.
          </ClientOnly> 
          */}

          <Scripts />
        </PostHogProvider>
      </body>
    </html>
  );
}
