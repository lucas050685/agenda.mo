import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';
import { AddressValidator } from './AddressValidator';

export const PlaceValidator = z.object({
  businessId: z.string().optional(),
  groupId: z.string().optional(),
  title: z.string(),
  address: AddressValidator.optional(),
});

export const SavedPlaceValidator = EntityBaseValidator.extend(PlaceValidator.shape);