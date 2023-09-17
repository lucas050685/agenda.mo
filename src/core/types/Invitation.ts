import z from 'zod';
import { InvitationValidator, SavedInvitationValidator, InvitationStateEnum } from '@core/validators/InvitationValidator';

export const InvitationState = InvitationStateEnum.Enum;
export type Invitation = z.infer<typeof InvitationValidator>;
export type SavedInvitation = z.infer<typeof SavedInvitationValidator>;
