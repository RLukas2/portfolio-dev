'use client';

import { motion } from 'framer-motion';

import { FOOTER_ICON_LINKS, FOOTER_LINKS } from '@/constants/links';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

import Container from '../container';
import Link from '../link';

const Footer = () => {
  return (
    <footer className={cn('bg-grid mb-10 pt-16 text-sm')}>
      {/* Horizontal Line*/}
      <div className={cn('border-muted-background col-span-1 border-b')} />

      {/* Footer Content */}
      <Container className={cn('mt-8 flex flex-col gap-8 md:mt-16')}>
        <motion.div
          className={cn('mb-4 grid grid-cols-2 gap-6 md:grid-cols-4')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <h1 className={cn('text-xl font-bold')}>{SITE.author.name}</h1>
            <p className={cn('text-muted-foreground/80 mt-3 text-xs')}>
              A blog about software development, web technologies, and
              programming tutorials. Sharing knowledge and experiences to help
              developers grow.
            </p>
          </div>{' '}
          {/* Link Sections */}
          {FOOTER_LINKS.map((group, index) => (
            <div
              key={`footerGroup${index}`}
              className={cn('flex flex-col items-start gap-2')}
            >
              <h3 className={cn('text-foreground mb-2 font-semibold')}>
                {group.header}
              </h3>
              {group.links.map(({ title, path }) => (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    'text-muted-foreground/80 font-medium transition-colors duration-200',
                    'hover:text-foreground',
                  )}
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Horizontal Line*/}
        <div className={cn('border-muted-background col-span-1 border-b')} />

        {/* Bottom Footer */}
        <div className={cn('flex items-center justify-between gap-4')}>
          <div className={cn('font-medium')}>
            &copy; {new Date().getFullYear()}{' '}
            <Link href="/">{SITE.author.name}</Link> ——{' '}
            <em className={cn('text-muted-foreground')}>
              <Link href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam">
                Ho Chi Minh, Vietnam
              </Link>
            </em>
          </div>
          <div className={cn('flex gap-4')}>
            {FOOTER_ICON_LINKS.map(({ title, url, icon, className }, index) => (
              <Link
                key={`footerIcon-${title}-${index}`}
                href={url}
                title={title}
                className={cn(
                  'text-muted-foreground text-lg transition-colors duration-200 ease-out',
                  className,
                )}
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
