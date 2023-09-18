import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const BusinessRoleValidator = z.object({
  businessId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  userIds: z.string().array(),
  default: z.boolean().optional(),
});

export const SavedBusinessRoleValidator = EntityBaseValidator.extend(BusinessRoleValidator.shape);
