import { emitEvent } from './emitEvent';
import { EventBus, RoleRepository, UserRepository } from './interfaces';
import { GroupRepository } from './interfaces/GroupRepository';
import { Group, Role, SavedGroup } from './types';

export namespace createGroup {
  export type Adapters = {
    groupRepository: GroupRepository;
    userRepository: UserRepository;
    roleRepository: RoleRepository;
    eventBus: EventBus;
  }
}

type Adapters = createGroup.Adapters;

export async function createGroup(group: Group, adapters: Adapters): Promise<SavedGroup> {
  const user = await adapters.userRepository.getById(group.admin);
  if (!user) throw new Error(`User ${group.admin} does not exist`);
  const savedGroup = await adapters.groupRepository.save(group);
  emitEvent({eventName: 'createGroup', body: {...savedGroup}}, adapters);
  const defaultRole: Role = {
    groupId: savedGroup.id,
    title: 'default',
    default: true,
    userIds: [group.admin],
  }
  const role = await adapters.roleRepository.save(defaultRole);
  savedGroup.defaultRoleId = role.id;
  await adapters.groupRepository.update(savedGroup);
  emitEvent({eventName: 'createDefaultRole', body: {...role}}, adapters);
  return savedGroup
}
