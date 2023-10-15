import { Invitation, SavedInvitation, WhereCondition, WhereStatement } from "@/core/types";

export interface InvitationRepository {
  save(invitation: Invitation): Promise<SavedInvitation>;
  where(where: WhereStatement | WhereStatement[]): Promise<SavedInvitation[]>;
}
