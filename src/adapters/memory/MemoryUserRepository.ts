import { UserRepository } from '@/core/interfaces';
import { SavedUser, User, WhereStatement } from '@/core/types';
import { createEntityBase } from './createEntityBase';
import { match } from './match';
import { NoExistentUser } from '@/core/errors';

const userDataBase: Map<string, SavedUser> = new Map();

export class MemoryUserRepository implements UserRepository {
  async getByEmail(email: string): Promise<SavedUser | undefined> {
    const savedUser = userDataBase.get(email);
    return savedUser;
  }

  async getById(id: string): Promise<SavedUser | undefined> {
    const users = [...userDataBase.values()];
    return users.find(user => user.id === id);
  }

  async save(user: User): Promise<SavedUser> {
    const savedUser: SavedUser = {
      ...createEntityBase(),
      ...user
    }

    userDataBase.set(user.email, {...savedUser });
    return savedUser
  }

  async where(where: WhereStatement | WhereStatement[]): Promise<SavedUser[]> {
    const users = [...userDataBase.values()];
    return users.filter(user => match(user, where));
  }

  async update(savedUser: SavedUser): Promise<SavedUser> {
    const currentUser = await this.getById(savedUser.id);
    if (!currentUser) throw new NoExistentUser(savedUser.id);
    userDataBase.set(currentUser.id, {
      ...currentUser,
      ...savedUser,
    });

    return {
      ...currentUser,
      ...savedUser,
    };
  }

  clear(){
    userDataBase.clear();
  }
}