import { RoleRepository, UserRepository } from "./interfaces";
import { GroupRepository } from "./interfaces/GroupRepository";
import { SavedRole } from "./types";

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
  }

  export type RoleId = string;
}

const getRoles = (rolesGroup: SavedRole[], roleIds: string[] | string | undefined): SavedRole[] => {
  if (rolesGroup.length <= 0) return []
  if (!roleIds) {
    const defaultRole = rolesGroup.find( role => role.default );
    if(!defaultRole) return [];
    return [defaultRole];
  }

  if(!Array.isArray(roleIds)) roleIds = [roleIds];

  return rolesGroup.filter(role => roleIds?.includes(role.id));
};

export async function addUserToGroup(
  { groupId, roleId, userId }: addUserToGroup.Params,
  adapters: addUserToGroup.Adapters,
): Promise<addUserToGroup.RoleId[]>{
  const allRoles = await adapters.roleRepository.getByGroupId(groupId);
  const roles = getRoles(allRoles, roleId);
  const roleIds: addUserToGroup.RoleId[] = [];
  const updatedRoles = roles.map(role => {
    roleIds.push(role.id);
    const userIds = new Set(...role.userIds ?? [])
    userIds.add(userId);
    return {
      ...role,
      userIds: [...userIds],
    }
  })

  for(let role of updatedRoles) await adapters.roleRepository.update(role);
  return roleIds;
}
