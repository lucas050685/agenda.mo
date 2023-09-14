import { EntityBaseValidator } from '@core/validators';
import z from 'zod';

export type EntityBase = z.infer<typeof EntityBaseValidator>;
