import { UserRepository } from "./interfaces";

export async function userExists(userId: string, userRepository: UserRepository): Promise<boolean> {
  const user = await userRepository.getById(userId);
  return !!user;
}
