import { Role, SavedRole, WhereStatement } from "@/core/types";

export interface RoleRepository {
  save(role: Role): Promise<SavedRole>;
  update(savedRole: SavedRole): Promise<SavedRole>;
  getByGroupId(groupId: string): Promise<SavedRole[]>;
  getById(roleId: string): Promise<SavedRole | undefined>;
  where(where: WhereStatement | WhereStatement[]): Promise<SavedRole[]>;
}
