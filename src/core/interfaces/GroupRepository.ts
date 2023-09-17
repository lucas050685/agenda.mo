import { Group, SavedGroup } from "@core/types";

export interface GroupRepository {
  save(group: Group): Promise<SavedGroup>;
  getById(groupId: string): Promise<SavedGroup | undefined>;
}
