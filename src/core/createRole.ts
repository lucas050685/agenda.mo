import { NoExistentGroup } from './errors';
import { GroupRepository, RoleRepository } from './interfaces';
import { Role, SavedRole } from './types';

export namespace createRole {
  export type Adapters = {
    roleRepository: RoleRepository,
    groupRepository: GroupRepository,
  };
}

export async function createRole(role: Role, adapters: createRole.Adapters): Promise<SavedRole> {
  const savedGroup = await adapters.groupRepository.getById(role.groupId);
  if(!savedGroup) throw new NoExistentGroup(role.groupId);
  return adapters.roleRepository.save(role);
}
