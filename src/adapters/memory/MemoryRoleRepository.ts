import { RoleRepository } from '@core/interfaces';
import { Role, SavedRole, WhereStatement } from '@core/types';
import { createEntityBase } from './createEntityBase';
import { match } from './match';

const roleDatabase: Map<string, SavedRole> = new Map();

export class MemoryRoleRepository implements RoleRepository {
  async save(role: Role): Promise<SavedRole> {
    const entity = createEntityBase();
    const savedRole = {
      ...entity,
      ...role,
    }
    roleDatabase.set(savedRole.id, savedRole);
    return {...savedRole};
  }

  async getByGroupId(groupId: string): Promise<SavedRole[]> {
    const roles = [...roleDatabase.values()];
    return roles.filter((role)=> role.groupId === groupId);
  }

  async getById(roleId: string): Promise<SavedRole | undefined> {
    return roleDatabase.get(roleId);
  }

  async update(savedRole: SavedRole): Promise<SavedRole> {
    const existentRole = roleDatabase.get(savedRole.id);
    const newRole = {
      ...existentRole,
      ...savedRole,
    }
    roleDatabase.set(savedRole.id, {...newRole});
    return newRole;
  }

  async where(where: WhereStatement | WhereStatement[]): Promise<SavedRole[]> {
    const allRoles = [...roleDatabase.values()];
    const roles = allRoles.filter(role => match(role, where));
    return roles.map(role => ({...role}));
  }

  clear(): void {
    roleDatabase.clear();
  }
}