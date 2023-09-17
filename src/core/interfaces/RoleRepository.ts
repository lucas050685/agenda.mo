import { Role, SavedRole } from "@core/types";

export interface RoleRepository {
  save(role: Role): Promise<SavedRole>;
  update(savedRole: SavedRole): Promise<SavedRole>;
  getByGroupId(groupId: string): Promise<SavedRole[]>;
}
