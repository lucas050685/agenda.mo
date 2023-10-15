import z from 'zod';
import { BusinessValidator, SavedBusinessValidator } from '@/core/validators/BusinessValidator';

export type Business = z.infer<typeof BusinessValidator>;
export type SavedBusiness = z.infer<typeof SavedBusinessValidator>;
