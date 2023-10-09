import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';
import { PhoneNumberValidator } from './PhoneNumberValidator';
import { AddressValidator } from './AddressValidator';

export const UserValidator = z.object({
  email: z.string().email("A valid user email is required"),
  name: z.string().optional(),
  password: z.string().optional(),
  passwordDetails: z.record(z.any()).optional(),
  phoneNumbers: PhoneNumberValidator.array().optional(),
  addresses: AddressValidator.array().optional(),
});

export const SavedUserValidator = EntityBaseValidator.extend(UserValidator.shape);
