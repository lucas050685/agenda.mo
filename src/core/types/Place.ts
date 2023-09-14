import z from 'zod';
import { PlaceValidator, SavedPlaceValidator } from '@core/validators/PlaceValidator';

export type Place = z.infer<typeof PlaceValidator>;
export type SavedPlace = z.infer<typeof SavedPlaceValidator>;