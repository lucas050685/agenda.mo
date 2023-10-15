import { BusinessRole, SavedBusinessRole } from "@/core/types";

export interface BusinessRoleRepository {
  save(businessRole: BusinessRole): Promise<SavedBusinessRole>;
}
