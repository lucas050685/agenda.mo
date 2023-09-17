import z from 'zod';
import { EntityBaseValidator } from './EntityBaseValidator';

export const InvitationStateEnum = z.enum(["pending"]);

export const InvitationValidator = z.object({
  userId: z.string(),
  rendezvousId: z.string(),
  state: InvitationStateEnum,
})

export const SavedInvitationValidator = EntityBaseValidator.extend(InvitationValidator.shape);
