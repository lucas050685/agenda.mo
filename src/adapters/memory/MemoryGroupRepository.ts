import { GroupRepository } from '@/core/interfaces/GroupRepository';
import { Group, SavedGroup, WhereStatement } from '@/core/types';
import { createEntityBase } from './createEntityBase';
import { match } from './match';

const groupDatabase: Map<string, SavedGroup> = new Map();

export class MemoryGroupRepository implements GroupRepository {
  async save(group: Group): Promise<SavedGroup> {
    const savedGroup: SavedGroup = {
      ...createEntityBase(),
      ...group,
    }

    groupDatabase.set(savedGroup.id, savedGroup);

    return savedGroup;
  }

  async getById(groupId: string): Promise<SavedGroup | undefined> {
    return groupDatabase.get(groupId);    
  }

  async update(savedGroup: SavedGroup): Promise<SavedGroup> {
    const existentGroup = groupDatabase.get(savedGroup.id);
    const newGroup: SavedGroup = {
      ...existentGroup,
      ...savedGroup,
      updatedAt: new Date().toISOString(),
    }
    groupDatabase.set(newGroup.id, newGroup);
    return {...newGroup};
  }

  async where(where: WhereStatement | WhereStatement[]): Promise<SavedGroup[]> {
    const allGroups = [...groupDatabase.values()];
    const groups = allGroups.filter(group => match(group, where));
    return groups.map(group => ({...group}));
  }

  clear() {
    groupDatabase.clear();
  }
}