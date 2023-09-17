import { RoleRepository } from '@core/interfaces';
import { Role, SavedRole } from '@core/types';
import { createEntityBase } from './createEntityBase';

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

  async update(savedRole: SavedRole): Promise<SavedRole> {
    const existentRole = roleDatabase.get(savedRole.id);
    const newRole = {
      ...existentRole,
      ...savedRole,
    }
    roleDatabase.set(savedRole.id, {...newRole});
    return newRole;
  }

  clear(): void {
    roleDatabase.clear();
  }
}