import { Laptop, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';

function ThemeToggle({ setTheme }: { setTheme: (theme: 'light' | 'dark' | 'auto') => void }) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={`Current theme: ${currentTheme}. Click to change theme`}
          className="h-8 w-8 cursor-pointer px-0"
          size="sm"
          variant="ghost"
        >
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')}>
          <Sun aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
          <Moon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('auto')}>
          <Laptop aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ThemeToggle };
