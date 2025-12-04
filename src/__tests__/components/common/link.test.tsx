import { render, screen } from '@testing-library/react';

import Link from '@/components/common/link';

// Mock Next.js Link
jest.mock('next/link', () => {
  const MockNextLink = ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  MockNextLink.displayName = 'MockNextLink';
  return MockNextLink;
});

describe('Link', () => {
  it('should throw error when href is missing', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<Link href="">Test</Link>);
    }).toThrow('Link must have an href');

    consoleSpy.mockRestore();
  });

  it('should render internal link with Next.js Link', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByText('About');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('should render anchor link', () => {
    render(<Link href="#section">Section</Link>);
    const link = screen.getByText('Section');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#section');
  });

  it('should render external link with security attributes', () => {
    render(<Link href="https://example.com">External</Link>);
    const link = screen.getByText('External');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should apply variant classes', () => {
    render(
      <Link href="/test" variant="muted">
        Muted Link
      </Link>,
    );
    const link = screen.getByText('Muted Link');
    expect(link).toHaveClass('text-muted-foreground');
  });

  it('should apply custom className', () => {
    render(
      <Link href="/test" className="custom-link">
        Custom
      </Link>,
    );
    const link = screen.getByText('Custom');
    expect(link).toHaveClass('custom-link');
  });
});
