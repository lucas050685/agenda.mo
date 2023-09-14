import { User } from './types';
import { UserRepository } from './interfaces';
import { UserValidator } from './validators';
import { stringifyZodError } from './helpers/stringifyZodError';

export namespace createUser {
  export type Adapters = {
    userRepository: UserRepository
  }
}

export async function createUser(user: User, adapters: createUser.Adapters){
  const userValidation = UserValidator.safeParse(user);
  if (!userValidation.success){
    const message = stringifyZodError(userValidation.error);
    throw new Error(message);
  }

  if (await adapters.userRepository.getByEmail(user.email)){
    throw new Error(`This email is already registered`);
  }

  const savedUser = await adapters.userRepository.save(user);
  return savedUser;
}
