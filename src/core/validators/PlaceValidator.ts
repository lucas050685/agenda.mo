import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const PlaceValidator = z.object({
  businessId: z.string().optional(),
});

export const SavedPlaceValidator = EntityBaseValidator.extend(PlaceValidator.shape);