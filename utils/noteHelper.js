import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);

export function generateId(array) {
  const maxId = array.length > 0 ? Math.max(...array.map((n) => n.id)) : 0;
  return maxId + 1;
}
