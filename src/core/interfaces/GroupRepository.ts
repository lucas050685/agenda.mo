import { Group, SavedGroup } from "@core/types";

export interface GroupRepository {
  save(group: Group): Promise<SavedGroup>
}
