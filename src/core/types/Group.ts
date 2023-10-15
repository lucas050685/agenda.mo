import z from 'zod';
import { GroupValidator, SavedGroupValidator } from '@/core/validators/GroupValidator';

export type Group = z.infer<typeof GroupValidator>;
export type SavedGroup = z.infer<typeof SavedGroupValidator>;
