import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import type { CommandMenuItem } from '@/types/menu';

export const useCommandPalette = (
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActiveRoute = useCallback(
    (path: string) => pathname === path,
    [pathname],
  );

  const handleOnSelect = useCallback(
    (action: CommandMenuItem) => {
      if (action.closeOnSelect) setIsOpen(false);

      if (action.onClick) {
        action.onClick();
        return;
      }

      if (action.isExternal) {
        window.open(action.href, '_blank');
      } else {
        router.push(action.href);
      }
    },
    [router, setIsOpen],
  );

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [isOpen, setIsOpen]);

  return { isActiveRoute, handleOnSelect };
};
