import { UserRepository } from '@core/interfaces';
import { SavedUser, User, WhereStatement } from '@core/types';
import { createEntityBase } from './createEntityBase';
import { match } from './match';

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

  clear(){
    userDataBase.clear();
  }
}