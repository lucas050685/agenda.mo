import { RoleRepository, UserRepository } from './interfaces';
import { GroupRepository } from './interfaces/GroupRepository';
import { Group, Role, SavedGroup } from './types';

export namespace createGroup {
  export type Adapters = {
    groupRepository: GroupRepository;
    userRepository: UserRepository;
    roleRepository: RoleRepository;
  }
}

export async function createGroup(group: Group, adapters: createGroup.Adapters): Promise<SavedGroup> {
  const user = await adapters.userRepository.getById(group.admin);
  if (!user) throw new Error(`User ${group.admin} does not exist`);
  const savedGroup = await adapters.groupRepository.save(group);
  const defaultRole: Role = {
    groupId: savedGroup.id,
    title: 'default',
    default: true,
    userIds: [group.admin],
  }
  await adapters.roleRepository.save(defaultRole);
  return savedGroup
}
