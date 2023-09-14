import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const GroupValidator = z.object({
  title: z.string(),
  admin: z.string(),
  description: z.string().optional(),
});

export const SavedGroupValidator = EntityBaseValidator.extend(GroupValidator.shape);
