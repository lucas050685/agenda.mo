import { GroupRepository } from '@core/interfaces/GroupRepository';
import { Group, SavedGroup } from '@core/types';
import { createEntityBase } from './createEntityBase';

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

  clear() {
    groupDatabase.clear();
  }
}