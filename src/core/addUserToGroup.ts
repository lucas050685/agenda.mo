import { emitEvent } from "./emitEvent";
import { NoExistentGroup, NoExistentRole, NoExistentUser } from "./errors";
import { EventBus, RoleRepository, UserRepository } from "./interfaces";
import { GroupRepository } from "./interfaces/GroupRepository";
import { SavedGroup, SavedRole } from "./types";

export namespace addUserToGroup {
  export type Params = {
    userId: string;
    groupId: string;
    roleId?: string | string[];
  };

  export type Adapters = {
    userRepository: UserRepository;
    groupRepository: GroupRepository;
    roleRepository: RoleRepository;
    eventBus: EventBus;
  }

  export type RoleId = string;
}

type RoleId = addUserToGroup.RoleId;
type Adapters = addUserToGroup.Adapters;
type Params = addUserToGroup.Params;

const getRoles = async (group: SavedGroup, roleIds: string[] | string | undefined, adapters: Adapters): Promise<SavedRole[]> => {
  if (!roleIds){
    if (!group.defaultRoleId) throw new Error(`No role is defined for the group ${group.id}`);
    const role = await adapters.roleRepository.getById(group.defaultRoleId);
    if (!role) throw new NoExistentRole(group.defaultRoleId);
    return [role];
  }
  if (!Array.isArray(roleIds)) roleIds = [roleIds];
  const roles = await adapters.roleRepository.where({id: {in: roleIds}});
  return roles;
}

export async function addUserToGroup({ groupId, roleId, userId }: Params, adapters: Adapters): Promise<RoleId[]>{
  const user = await adapters.userRepository.getById(userId);
  if (!user) throw new NoExistentUser(userId);
  
  const group = await adapters.groupRepository.getById(groupId);
  if (!group) throw new NoExistentGroup(groupId);
  
  let userHasbeenAdded = false
  const roles = await getRoles(group, roleId, adapters);
  for (let role of roles){
    if (role.userIds?.includes(userId)) continue;
    role.userIds = [...new Set([userId, ...(role.userIds ?? [])])];
    await adapters.roleRepository.update(role);
    emitEvent({eventName:'addUserToRole', body: {userId, roleId: role.id}}, adapters);
    userHasbeenAdded = true;
  }

  if (userHasbeenAdded) emitEvent({eventName: 'addUserToGroup', body: {userId, groupId}}, adapters);

  return roles.map(role => role.id);
}
