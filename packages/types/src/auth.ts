import type { SimpleIcon } from 'simple-icons';

/**
 * Authentication provider configuration
 * Used to configure OAuth providers (GitHub, Google, etc.)
 */
export interface AuthProvider {
  icon: SimpleIcon;
  label: string;
  provider: string;
}
