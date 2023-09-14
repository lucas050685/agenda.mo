import z from 'zod';
import { RendezvousValidator, SavedRendezvousValidator } from '@core/validators/RendezvousValidator';

export type Rendezvous = z.infer<typeof RendezvousValidator>;
export type SavedRendezvous = z.infer<typeof SavedRendezvousValidator>;
