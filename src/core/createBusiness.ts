import { NoExistentUser } from "./errors";
import { BusinessRepository, UserRepository } from "./interfaces";
import { Business, SavedBusiness } from "./types";

export namespace createBusiness {
  export type Adapters = {
    userRepository: UserRepository;
    businessRepository: BusinessRepository;
  }
}

type Adapters = createBusiness.Adapters;

export async function createBusiness(business: Business, adapters: Adapters): Promise<SavedBusiness> {
  const user = await adapters.userRepository.getById(business.admin);
  if (!user) throw new NoExistentUser(business.admin);
  return adapters.businessRepository.save(business);
}
