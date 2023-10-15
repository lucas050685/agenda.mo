import z from 'zod';
import { RoleValidator, SavedRoleValidator } from '@/core/validators/RoleValidator';

export type Role = z.infer<typeof RoleValidator>;
export type SavedRole = z.infer<typeof SavedRoleValidator>;
