import { emitEvent } from "./emitEvent";
import { InvitationRepository, RendezvousRepository, UserRepository, EventBus } from "./interfaces";
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
    eventBus: EventBus;
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
    const savedInvitation = await adapters.invitationRepository.save(invitation);
    savedInvitations.push(savedInvitation);
    emitEvent({eventName: 'createInvitation', body: {...savedInvitation}}, adapters);
  }

  return savedInvitations;
}
