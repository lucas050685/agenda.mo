import z from 'zod';
import { BusinessRoleValidator, SavedBusinessRoleValidator } from '@core/validators/BusinessRoleValidator';

export type BusinessRole = z.infer<typeof BusinessRoleValidator>;
export type SavedBusinessRole = z.infer<typeof SavedBusinessRoleValidator>;
