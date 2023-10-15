import { InvitationRepository } from "@/core/interfaces";
import { Invitation, SavedInvitation, WhereStatement } from "@/core/types";
import { createEntityBase } from "./createEntityBase";
import { match } from "./match";

const invitationDatabase: Map<string, SavedInvitation> = new Map();

export class MemoryInvitationRepository implements InvitationRepository {
  async save(invitation: Invitation): Promise<SavedInvitation> {
    const savedInvitation = {
      ...createEntityBase(),
      ...invitation,
    }
    invitationDatabase.set(savedInvitation.id, savedInvitation);
    return {...savedInvitation};
  }

  async where(where: WhereStatement | WhereStatement[]): Promise<SavedInvitation[]> {
    const allInvitations = [...invitationDatabase.values()];
    return allInvitations
      .filter(invitation => match(invitation, where))
      .map(invitation => ({...invitation}));
  }

  clear() {
    invitationDatabase.clear();
  }
}
