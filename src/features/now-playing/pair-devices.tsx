import { Computer, SmartphoneIcon } from 'lucide-react';

export const pairDevices: Record<
  string,
  { icon: React.ReactNode; model: string; id: string }
> = {
  Computer: {
    icon: <Computer className="size-5" />,
    model: 'Personal Computer',
    id: 'rlukas-PC',
  },
  Smartphone: {
    icon: <SmartphoneIcon className="size-5" />,
    model: 'iPhone 12 Pro Max',
    id: 'rlukas-iphone',
  },
};
