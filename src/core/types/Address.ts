import z from 'zod';
import { AddressValidator } from '@core/validators';

export type Address = z.infer<typeof AddressValidator>;
