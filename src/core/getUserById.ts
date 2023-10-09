import { UserRepository } from "./interfaces";
import { SavedUser } from "./types";
import { removeUserSensitiveInformations } from './helpers';

export namespace getUserById {
  export type Params = {
    userId: string;
    sensitiveInfo?: boolean
  }

  export type Adapters = {
    userRepository: UserRepository;
  }
}

type Adapters = getUserById.Adapters;
type Params = getUserById.Params;

export async function getUserById({ userId, sensitiveInfo }: Params, adapters: Adapters): Promise<SavedUser | undefined> {
  const user = await adapters.userRepository.getById(userId);
  if (sensitiveInfo || !user) return user;
  return removeUserSensitiveInformations(user);
}
