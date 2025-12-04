import { fireEvent, render, screen } from '@testing-library/react';

import ThemeSwitch from '@/components/theme-switch';

// Mock next-themes
const mockSetTheme = jest.fn();
jest.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: mockSetTheme,
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: (props: any) => <path {...props} />,
  },
  useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
  useTransform: () => ({ get: () => 0 }),
}));

// Mock use-mounted hook
jest.mock('@/hooks/use-mounted', () => ({
  __esModule: true,
  default: () => true,
}));

describe('ThemeSwitch', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it('should render theme switch button', () => {
    render(<ThemeSwitch />);
    const button = screen.getByRole('button', { name: /theme switch button/i });
    expect(button).toBeInTheDocument();
  });

  it('should toggle theme on click', () => {
    render(<ThemeSwitch />);
    const button = screen.getByRole('button', { name: /theme switch button/i });

    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should render SVG icon', () => {
    const { container } = render(<ThemeSwitch />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
