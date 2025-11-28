import { LaptopIcon, SmartphoneIcon } from 'lucide-react';

export const pairDevices: Record<
  string,
  { icon: React.ReactNode; model: string; id: string }
> = {
  Computer: {
    icon: <LaptopIcon className="size-5" />,
    model: 'Macbook Air',
    id: 'rlukas-macbook-air',
  },
  Smartphone: {
    icon: <SmartphoneIcon className="size-5" />,
    model: 'iPhone 12 Pro Max',
    id: 'rlukas-iphone',
  },
};
