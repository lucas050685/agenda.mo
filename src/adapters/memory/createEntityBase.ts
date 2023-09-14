import { v4 as uuid } from 'uuid';
import { EntityBase } from '@core/types';

export function createEntityBase(): EntityBase {
  const now = new Date().toISOString();
  return {
    id: uuid(),
    createdAt: now,
    updatedAt: now,
  }
}
