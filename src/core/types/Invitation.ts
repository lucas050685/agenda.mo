import z from 'zod';
import { InvitationValidator, SavedInvitationValidator } from '@core/validators/InvitationValidator';

export type Invitation = z.infer<typeof InvitationValidator>;
export type SavedInvitation = z.infer<typeof SavedInvitationValidator>;
