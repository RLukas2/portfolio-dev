import { render, screen } from '@testing-library/react';

import { TooltipProvider } from '@/components/ui/tooltip';
import Hero from '@/features/home/components/hero';

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
