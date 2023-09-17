import { InvitationRepository, RendezvousRepository, UserRepository } from "./interfaces";
import { Invitation, InvitationState, SavedInvitation } from "./types";

export namespace createInvitations {
  export type Params = {
    rendezvousId: string;
    userIds: string[];
  };

  export type Adapters = {
    userRepository: UserRepository;
    invitationRepository: InvitationRepository;
    rendezvousRepository: RendezvousRepository;
  };
}

type Params = createInvitations.Params;
type Adapters = createInvitations.Adapters;

export async function createInvitations({ rendezvousId, userIds }: Params, adapters: Adapters): Promise<SavedInvitation[]> {
  const rendezvous = await adapters.rendezvousRepository.getById(rendezvousId);
  if (!rendezvous) throw new Error(`Rendezvous ${rendezvousId} does not exist`);
  if (userIds.length <= 0) throw new Error(`No user has been defined`);

  const invitations: Invitation[] = [];
  for(let userId of userIds){
    const user = await adapters.userRepository.getById(userId);
    if (!user) throw new Error(`User ${userId} does not exist`);
    invitations.push({
      rendezvousId,
      userId,
      state: InvitationState.pending,
    })
  }

  const savedInvitations: SavedInvitation[] = [];
  for(let invitation of invitations){
    savedInvitations.push(await adapters.invitationRepository.save(invitation));
  }

  return savedInvitations;
}
