import {
  cn,
  formatDate,
  getContentImagePath,
  randomBetween,
  trim,
} from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe(
        'text-red-500 bg-blue-500',
      );
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'active', false && 'inactive')).toBe(
        'base active',
      );
    });

    it('should merge conflicting Tailwind classes', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
    });
  });

  describe('formatDate', () => {
    it('should format date with default format', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/January 15, 2024/);
    });

    it('should format date with custom format', () => {
      const result = formatDate('2024-01-15', 'yyyy-MM-dd');
      expect(result).toMatch(/2024-01-15/);
    });
  });

  describe('trim', () => {
    it('should trim text to specified length', () => {
      expect(trim('This is a long text', 10)).toBe('This is a ...');
    });

    it('should not trim text shorter than max length', () => {
      expect(trim('Short', 10)).toBe('Short');
    });

    it('should handle undefined text', () => {
      expect(trim(undefined, 10)).toBe('');
    });

    it('should use default max length of 20', () => {
      const longText =
        'This is a very long text that exceeds twenty characters';
      expect(trim(longText)).toBe('This is a very long ...');
    });
  });

  describe('getContentImagePath', () => {
    it('should return full path for local image', () => {
      expect(getContentImagePath('blog', 'image.jpg')).toBe(
        '/media/blog/image.jpg',
      );
    });

    it('should return URL for external image', () => {
      expect(getContentImagePath('blog', 'https://example.com/image.jpg')).toBe(
        'https://example.com/image.jpg',
      );
    });

    it('should return empty string when no image provided', () => {
      expect(getContentImagePath('blog')).toBe('');
    });
  });

  describe('randomBetween', () => {
    it('should return number between min and max', () => {
      const result = randomBetween(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('should handle negative numbers', () => {
      const result = randomBetween(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    });
  });
});
