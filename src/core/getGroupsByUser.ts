import { GroupRepository, RoleRepository, UserRepository } from "./interfaces";
import { Group } from "./types"

export namespace getGroupsByUser {
  export type Params = {
    userId: string;
  };

  export type Adapters = {
    userRepository: UserRepository,
    groupRepository: GroupRepository,
    roleRepository: RoleRepository,
  }
}

type Params = getGroupsByUser.Params;
type Adapters = getGroupsByUser.Adapters;

export async function getGroupsByUser({ userId }: Params, adapters: Adapters): Promise<Group[]> {
  const user = await adapters.userRepository.getById(userId);
  if (!user) return [];
  const roles = await adapters.roleRepository.where({ userIds: { contains: userId } });
  const groupIds = roles.map(role => role.groupId);
  const groups = await adapters.groupRepository.where([{ id: {in: groupIds}}, { admin: userId }]);
  return groups;
};
