import { render, screen } from '@testing-library/react';

import ExternalLink from '@/components/common/external-link';

describe('ExternalLink', () => {
  it('should render external link', () => {
    render(<ExternalLink href="https://example.com">Example</ExternalLink>);
    const link = screen.getByText('Example');
    expect(link).toBeInTheDocument();
  });

  it('should have security attributes', () => {
    render(<ExternalLink href="https://example.com">Test</ExternalLink>);
    const link = screen.getByText('Test');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should apply custom className', () => {
    render(
      <ExternalLink href="https://example.com" className="custom-external">
        Custom
      </ExternalLink>,
    );
    const link = screen.getByText('Custom');
    expect(link).toHaveClass('custom-external');
  });

  it('should have correct href', () => {
    render(<ExternalLink href="https://github.com">GitHub</ExternalLink>);
    const link = screen.getByText('GitHub');
    expect(link).toHaveAttribute('href', 'https://github.com');
  });
});
