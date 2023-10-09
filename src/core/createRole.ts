import { emitEvent } from './emitEvent';
import { NoExistentGroup } from './errors';
import { EventBus, GroupRepository, RoleRepository } from './interfaces';
import { Role, SavedRole } from './types';

export namespace createRole {
  export type Adapters = {
    roleRepository: RoleRepository,
    groupRepository: GroupRepository,
    eventBus: EventBus,
  };
}

export async function createRole(role: Role, adapters: createRole.Adapters): Promise<SavedRole> {
  const savedGroup = await adapters.groupRepository.getById(role.groupId);
  if(!savedGroup) throw new NoExistentGroup(role.groupId);
  const savedRole = await adapters.roleRepository.save(role);
  if (savedRole.default){
    await adapters.groupRepository.update({...savedGroup, defaultRoleId: savedRole.id});
  }
  emitEvent({eventName: 'createRole', body: {...savedRole}}, adapters);
  return savedRole;
}
