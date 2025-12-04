import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '@/lib/toast-utils';

describe('toast-utils', () => {
  let mockToast: jest.Mock;

  beforeEach(() => {
    mockToast = jest.fn();
  });

  describe('showErrorToast', () => {
    it('should show error toast with default message', () => {
      const error = new Error('Test error');
      showErrorToast(mockToast, error);

      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Test error',
      });
    });

    it('should use default message for non-Error objects', () => {
      showErrorToast(mockToast, 'string error');

      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Something went wrong. Please try again.',
      });
    });

    it('should use custom default message', () => {
      showErrorToast(mockToast, null, 'Custom error message');

      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Custom error message',
      });
    });
  });

  describe('showSuccessToast', () => {
    it('should show success toast with default title', () => {
      showSuccessToast(mockToast, 'Operation completed');

      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success',
        description: 'Operation completed',
      });
    });

    it('should show success toast with custom title', () => {
      showSuccessToast(mockToast, 'Data saved', 'Saved!');

      expect(mockToast).toHaveBeenCalledWith({
        title: 'Saved!',
        description: 'Data saved',
      });
    });
  });

  describe('showInfoToast', () => {
    it('should show info toast without title', () => {
      showInfoToast(mockToast, 'Information message');

      expect(mockToast).toHaveBeenCalledWith({
        title: undefined,
        description: 'Information message',
      });
    });

    it('should show info toast with title', () => {
      showInfoToast(mockToast, 'Details here', 'Info');

      expect(mockToast).toHaveBeenCalledWith({
        title: 'Info',
        description: 'Details here',
      });
    });
  });
});
