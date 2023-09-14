import z from 'zod';
import { UserValidator, SavedUserValidator } from '@core/validators/UserValidator';

export type User = z.infer<typeof UserValidator>;
export type SavedUser = z.infer<typeof SavedUserValidator>;
