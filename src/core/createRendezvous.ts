import { emitEvent } from "./emitEvent";
import { EventBus, GroupRepository, RendezvousRepository } from "./interfaces";
import { Rendezvous, SavedRendezvous } from "./types";

export namespace createRendezvous {
  export type Adapters = {
    groupRepository: GroupRepository;
    rendezvousRepository: RendezvousRepository;
    eventBus: EventBus;
  }
}

export async function createRendezvous(rendezvous: Rendezvous, adapters: createRendezvous.Adapters): Promise<SavedRendezvous> {
  const group = await adapters.groupRepository.getById(rendezvous.groupId);
  if (!group) throw new Error(`Group ${rendezvous.groupId} does not exist`);
  const savedRendezvous = await adapters.rendezvousRepository.save(rendezvous);
  emitEvent({eventName: 'createRendezvous', body: {...savedRendezvous}}, adapters);
  return savedRendezvous;
}
