import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';
import { AddressValidator } from './AddressValidator';
import { PhoneNumberValidator } from './PhoneNumberValidator';

export const BusinessValidator = z.object({
  admin: z.string(),
  title: z.string(),
  description: z.string(),
  address: AddressValidator,
  phoneNumbers: PhoneNumberValidator.array(),
  email: z.string().email().optional(),
});

export const SavedBusinessValidator = EntityBaseValidator.extend(BusinessValidator.shape);
