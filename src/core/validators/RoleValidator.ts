import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const RoleValidator = z.object({
  groupId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  userIds: z.string().array().optional(),
  default: z.boolean().optional(),
});

export const SavedRoleValidator = EntityBaseValidator.extend(RoleValidator.shape);