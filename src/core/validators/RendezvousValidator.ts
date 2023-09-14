import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';
import { AddressValidator } from './AddressValidator';

export const RecurrenceRateEnum = z.enum(["never", "daily", "weekly", "fortnightly", "monthly"])

export const RendezvousValidator = z.object({
  groupId: z.string(),
  title: z.string(),
  date: z.string().datetime(),
  duration: z.number().optional(),
  placeId: z.string().optional(),
  address: AddressValidator.optional(),
  recurrenceRate: RecurrenceRateEnum.optional(),
});

export const SavedRendezvousValidator = EntityBaseValidator.extend(RendezvousValidator.shape);
