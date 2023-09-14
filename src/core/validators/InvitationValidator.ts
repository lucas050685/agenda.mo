import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const InvitationValidator = z.object({
  userId: z.string(),
  rendezvousId: z.string(),
  state: z.string(),
})

export const SavedInvitationValidator = EntityBaseValidator.extend(InvitationValidator.shape);
