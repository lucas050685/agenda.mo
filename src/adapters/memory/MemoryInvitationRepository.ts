import { InvitationRepository } from "@core/interfaces";
import { Invitation, SavedInvitation } from "@core/types";
import { createEntityBase } from "./createEntityBase";

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

  clear() {
    invitationDatabase.clear();
  }
}
