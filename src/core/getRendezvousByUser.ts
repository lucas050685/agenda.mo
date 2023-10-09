import { UserRepository, InvitationRepository, RendezvousRepository } from "./interfaces";
import { Rendezvous, WhereStatement } from "./types";

export namespace getRendezvousByUser {
  export type Params = {
    userId: string,
    startDate?: string,
    endDate?: string,
  }

  export type Adapters = {
    userRepository: UserRepository;
    invitationRepository: InvitationRepository;
    rendezvousRepository: RendezvousRepository;
  }
}

type Params = getRendezvousByUser.Params;
type Adapters = getRendezvousByUser.Adapters;

export async function getRendezvousByUser(params: Params, adapters: Adapters): Promise<Rendezvous[]> {
  const whereInvitation: WhereStatement = { userId: params.userId };
  if (params.startDate) whereInvitation.createdAt = { after: params.startDate };

  const invitations = await adapters.invitationRepository.where(whereInvitation);
  if (invitations.length <= 0) return [];
  const rendezvousIds = invitations.map(invitation => invitation.rendezvousId);
  const rendezvous = adapters.rendezvousRepository.where({id: {in: rendezvousIds}});
  return rendezvous;
}
