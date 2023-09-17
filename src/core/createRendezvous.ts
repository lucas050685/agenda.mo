import { GroupRepository, RendezvousRepository } from "./interfaces";
import { Rendezvous, SavedRendezvous } from "./types";

export namespace createRendezvous {
  export type Adapters = {
    groupRepository: GroupRepository;
    rendezvousRepository: RendezvousRepository;
  }
}

export async function createRendezvous(rendezvous: Rendezvous, adapters: createRendezvous.Adapters): Promise<SavedRendezvous> {
  const group = await adapters.groupRepository.getById(rendezvous.groupId);
  if (!group) throw new Error(`Group ${rendezvous.groupId} does not exist`);
  return await adapters.rendezvousRepository.save(rendezvous);
}
