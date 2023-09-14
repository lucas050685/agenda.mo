import { UserRepository } from './interfaces';
import { GroupRepository } from './interfaces/GroupRepository';
import { Group, SavedGroup } from './types';

export namespace createGroup {
  export type Adapters = {
    groupRepository: GroupRepository;
    userRepository: UserRepository;
  }
}

export async function createGroup(group: Group, adapters: createGroup.Adapters): Promise<SavedGroup> {
  const user = await adapters.userRepository.getById(group.admin);
  if (!user) throw new Error(`User ${group.admin} does not exist`);
  const savedGroup = await adapters.groupRepository.save(group);
  return savedGroup
}
