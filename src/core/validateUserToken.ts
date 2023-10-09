import { SavedUserValidator } from './validators';
import { stringifyZodError } from './helpers';
import { TokenizerAdapter, UserRepository } from './interfaces';
import { SavedUser } from './types';
import { InvalidTokenContent, InvalidToken } from './errors';

export namespace validateUserToken {
  export type Adapters = {
    tokenizerAdapter: TokenizerAdapter;
    userRepository: UserRepository;
  }
}

type Adapters = validateUserToken.Adapters;

export async function validateUserToken(token: string, adapters: Adapters): Promise<SavedUser> {
  const isTokenValid = await adapters.tokenizerAdapter.validate(token);
  if (!isTokenValid) throw new InvalidToken();

  const userData = await adapters.tokenizerAdapter.decode(token);
  const userDataValidation = SavedUserValidator.safeParse(userData);
  if (!userDataValidation.success){
    const message = stringifyZodError(userDataValidation.error);
    throw new InvalidTokenContent(message);
  }

  return userDataValidation.data;
}
