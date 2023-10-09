import { NoExistentUser } from "./errors";
import { PasswordAdapter, TokenizerAdapter, UserRepository } from "./interfaces";
import { removeUserSensitiveInformations } from './helpers';

export namespace authenticateUser {
  export type Adapters = {
    userRepository: UserRepository;
    passwordAdapter: PasswordAdapter;
    tokenizerAdapter: TokenizerAdapter;
  }

  export type Options = {
    email: string;
    password?: string;
  }
}

type Adapters = authenticateUser.Adapters;
type Options = authenticateUser.Options;

export async function authenticateUser({ email, password }: Options, adapter: Adapters): Promise<string> {
  const user = await adapter.userRepository.getByEmail(email);
  if (!user) throw new NoExistentUser(email);
  if (!password) throw new Error(`Password is not defined`);
  if (!user.password) throw new Error(`This user has no password defined`);
  if (!await adapter.passwordAdapter.compare(password, user.password, user.passwordDetails ?? {})) throw new Error(`User email and password do not match`);

  const dehydratedUser = removeUserSensitiveInformations(user);
  const token = await adapter.tokenizerAdapter.tokenize(dehydratedUser);
  return token;
}
