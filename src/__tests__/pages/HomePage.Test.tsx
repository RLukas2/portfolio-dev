import { render, screen } from '@testing-library/react';

import Hero from '@/features/home/components/hero';
import { TooltipProvider } from '@/components/ui/tooltip';

describe('Homepage', () => {
  it('renders the Components', () => {
    render(
      <TooltipProvider>
        <Hero />
      </TooltipProvider>,
    );

    const heading = screen.getByText(/Backend Developer/i);

    expect(heading).toBeInTheDocument();
  });
});
