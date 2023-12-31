import z from 'zod';

export const GeoLocationValidator = z.object({
  long: z.number(),
  lat: z.number(),
})

export const AddressValidator = z.object({
  street: z.string(),
  complement: z.string().optional(),
  number: z.string(),
  district: z.string().optional(),
  city: z.string(),
  postalCode: z.string(),
  state: z.string(),
  country: z.string(),
  default: z.boolean().optional(),
  geo: GeoLocationValidator.optional(),
});
