import { BusinessRepository, BusinessRoleRepository, UserRepository } from "./interfaces";
import { BusinessRole, SavedBusinessRole } from "./types";

export namespace createBusinessRole {
  export type Adapters = {
    businessRepository: BusinessRepository;
    businessRoleRepository: BusinessRoleRepository;
    userRepository: UserRepository;
  };
}

type Adapters = createBusinessRole.Adapters;

export async function createBusinessRole(businessRole: BusinessRole, adapters: Adapters): Promise<SavedBusinessRole> {
  const user = await adapters.userRepository.where({id: {in: businessRole.userIds}});
  if (user.length < businessRole.userIds.length) throw new Error(`One or more user do not exists in businessRole.userIds array`);
  const savedBusinessRole = await adapters.businessRoleRepository.save(businessRole);
  return savedBusinessRole;
}
