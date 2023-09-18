import { BusinessRoleRepository } from "@core/interfaces";
import { BusinessRole, SavedBusinessRole } from "@core/types";
import { createEntityBase } from './createEntityBase';

const businessRoleDatabase: Map<string, SavedBusinessRole> = new Map();

export class MemoryBusinessRoleRepository implements BusinessRoleRepository {
  async save(businessRole: BusinessRole): Promise<SavedBusinessRole> {
    const savedBusinessRole = {
      ...createEntityBase(),
      ...businessRole,
    }
    businessRoleDatabase.set(savedBusinessRole.id, savedBusinessRole);
    return {...savedBusinessRole};
  }

  clear(){
    businessRoleDatabase.clear();
  }
}
