// biome-ignore lint/performance/noNamespaceImport: Sentry SDK requires namespace import
import * as Sentry from '@sentry/node';
import type { db as DbClient } from '@xbrk/db/client';
import { auditLogs } from '@xbrk/db/schema';

type Db = typeof DbClient;

export interface AuditEntry {
  action: string;
  actorId: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
  resource: string;
  resourceId?: string;
  userAgent?: string;
}

/**
 * Writes a single audit log entry.
 *
 * Designed to be fire-and-forget — it never throws so a logging failure
 * cannot break the operation being audited. Errors are forwarded to Sentry.
 *
 * @example
 * writeAuditLog(db, {
 *   action: 'article.create',
 *   resource: 'article',
 *   resourceId: article.id,
 *   actorId: user.id,
 *   metadata: { title: article.title },
 *   ipAddress: '1.2.3.4',
 *   userAgent: 'Mozilla/5.0 ...',
 * });
 */
export async function writeAuditLog(db: Db, entry: AuditEntry): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId,
      actorId: entry.actorId,
      metadata: entry.metadata,
      ipAddress: entry.ipAddress,
      userAgent: entry.userAgent,
    });
  } catch (error) {
    // Never let audit logging break the main operation
    Sentry.captureException(error, {
      tags: { component: 'audit-log' },
      extra: { entry },
    });
  }
}

/**
 * Returns a bound audit function pre-filled with the actor's id, IP, and user-agent.
 * Pass this into context so handlers don't need to repeat these fields on every call.
 *
 * @example
 * const audit = createAuditor(db, user.id, '1.2.3.4', 'Mozilla/5.0 ...');
 * audit('article.create', 'article', article.id, { title: article.title });
 */
export function createAuditor(db: Db, actorId: string, ipAddress?: string, userAgent?: string) {
  return (action: string, resource: string, resourceId?: string, metadata?: Record<string, unknown>) =>
    writeAuditLog(db, { action, resource, resourceId, actorId, metadata, ipAddress, userAgent });
}
