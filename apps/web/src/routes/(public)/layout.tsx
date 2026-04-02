import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <main className="container mx-auto flex-1 px-4 py-4 sm:px-6 sm:py-6 md:py-10 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
      <Outlet />
    </main>
  );
}
