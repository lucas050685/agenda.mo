import { SavedUser, User } from './types';
import { EventBus, UserRepository, PasswordAdapter } from './interfaces';
import { UserValidator } from './validators';
import { stringifyZodError } from './helpers/stringifyZodError';
import { emitEvent } from './emitEvent';

export namespace createUser {
  export type Adapters = {
    userRepository: UserRepository;
    passwordAdapter: PasswordAdapter;
    eventBus: EventBus;
  }
}

type Adapters = createUser.Adapters;

const removeSensitiveData = (user: SavedUser): SavedUser => {
  const modUser = {...user};
  delete modUser.password;
  return modUser;
}

export async function createUser(user: User, adapters: Adapters): Promise<SavedUser>{
  const userValidation = UserValidator.safeParse(user);
  if (!userValidation.success){
    const message = stringifyZodError(userValidation.error);
    throw new Error(message);
  }

  if (await adapters.userRepository.getByEmail(user.email)){
    throw new Error(`This email is already registered`);
  }

  const userDraft = {
    ...user
  };

  if (userDraft.password){
    const [hash, details] = await adapters.passwordAdapter.hash(userDraft.password);
    userDraft.password = hash;
    userDraft.passwordDetails = details;
  }

  const savedUser = await adapters.userRepository.save(userDraft);
  emitEvent({eventName: 'createUser', body: removeSensitiveData(savedUser)}, adapters);
  return savedUser;
}
