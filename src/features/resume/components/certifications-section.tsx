'use client';

import { motion } from 'framer-motion';
import { AwardIcon, CalendarIcon, ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';

import EmptyState from '@/components/common/empty-state';
import { Badge } from '@/components/ui/badge';
import { cn, formatDate } from '@/lib/utils';

import { CERTIFICATIONS } from '../constants/certifications';

interface CertificationsSectionProps {
  className?: string;
}

const CertificationsSection = ({ className }: CertificationsSectionProps) => {
  if (!CERTIFICATIONS || CERTIFICATIONS.length === 0) {
    return (
      <div className={cn('space-y-8', className)}>
        <div>
          <h2 className="font-cal text-3xl font-bold">Certifications</h2>
          <p className="text-muted-foreground mt-2">
            Professional certifications and credentials
          </p>
        </div>

        <EmptyState
          message={
            'I remember I hang these certifications somewhere... Maybe check back later?'
          }
        />
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      <div>
        <h2 className="font-cal text-3xl font-bold">Certifications</h2>
        <p className="text-muted-foreground mt-2">
          Professional certifications and credentials
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CERTIFICATIONS.map((cert, index) => {
          const isExpired =
            cert.expiryDate && new Date(cert.expiryDate) < new Date();
          const isExpiringSoon =
            cert.expiryDate &&
            new Date(cert.expiryDate) <
              // eslint-disable-next-line react-hooks/purity
              new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days

          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card group rounded-xl border p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                {cert.logo ? (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={cert.logo}
                      alt={cert.issuer}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
                    <AwardIcon className="text-primary size-6" />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="size-3" />
                      <span>Issued {formatDate(cert.issueDate)}</span>
                    </div>
                    {cert.expiryDate && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <span>Expires {formatDate(cert.expiryDate)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {(isExpired || isExpiringSoon) && (
                    <div>
                      <Badge
                        variant={isExpired ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {isExpired ? 'Expired' : 'Expiring Soon'}
                      </Badge>
                    </div>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm transition-colors"
                    >
                      View Credential
                      <ExternalLinkIcon className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificationsSection;
