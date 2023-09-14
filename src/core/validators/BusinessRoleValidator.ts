import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const BusinessRoleValidator = z.object({
  groupId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  userIds: z.string().array(),
  default: z.boolean().optional(),
});

export const SavedBusinessRoleValidator = EntityBaseValidator.extend(BusinessRoleValidator.shape);
