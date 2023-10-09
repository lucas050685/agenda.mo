import { NoExistentGroup } from "./errors";
import { GroupRepository, RendezvousRepository } from "./interfaces";
import { SavedRendezvous } from "./types";

export namespace getRendezvousByGroup {
  export type Params = {
    groupId: string;
  };

  export type Adapters = {
    rendezvousRepository: RendezvousRepository;
    groupRepository: GroupRepository;
  };
}

type Params = getRendezvousByGroup.Params;
type Adapters = getRendezvousByGroup.Adapters;

export async function getRendezvousByGroup({ groupId }: Params, adapters: Adapters): Promise<SavedRendezvous[]> {
  const group = await adapters.groupRepository.getById(groupId);
  if (!group) throw new NoExistentGroup(groupId);
  const rendezvous = await adapters.rendezvousRepository.where({ groupId });
  return rendezvous;
}
