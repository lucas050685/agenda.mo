import z from 'zod';
import { RendezvousValidator, SavedRendezvousValidator, RecurrenceRateEnum } from '@core/validators/RendezvousValidator';

export const RecurrenceRate = RecurrenceRateEnum.Enum;
export type Rendezvous = z.infer<typeof RendezvousValidator>;
export type SavedRendezvous = z.infer<typeof SavedRendezvousValidator>;
