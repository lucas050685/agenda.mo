import { RoleRepository, UserRepository } from "./interfaces";
import { SavedUser } from "./types";

export namespace getUsersByGroup {
  export type Params = {
    groupId: string;
  };

  export type Adapters = {
    roleRepository: RoleRepository;
    userRepository: UserRepository;
  };
}

type Params = getUsersByGroup.Params;
type Adapters = getUsersByGroup.Adapters;

export async function getUsersByGroup({groupId}: Params, adapters: Adapters): Promise<SavedUser[]> {
  const roles = await adapters.roleRepository.where({groupId});
  if (roles.length <= 0) return [];
  const userIds = roles
    .map(role => role.userIds ?? [])
    .reduce((prev, current)=>{
      return prev.concat(current);
    }, []);
  const users = await adapters.userRepository.where({id: {in: [...new Set(userIds)]}});
  return users;
}
