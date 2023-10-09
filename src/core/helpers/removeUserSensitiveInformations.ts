import { User, SavedUser } from '../types';

export function removeUserSensitiveInformations(user: SavedUser): SavedUser {
  const modifiedUser = { ...user };
  if (modifiedUser.password) delete modifiedUser.password;
  if (modifiedUser.phoneNumbers) delete modifiedUser.phoneNumbers;
  return modifiedUser;
}
