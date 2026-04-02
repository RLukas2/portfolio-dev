import { createRouter } from '@xbrk/shared/create-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  return createRouter<typeof routeTree>({
    routeTree,
  });
}
