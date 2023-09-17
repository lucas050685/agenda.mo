import { Invitation, SavedInvitation } from "@core/types";

export interface InvitationRepository {
  save(invitation: Invitation): Promise<SavedInvitation>;
}
