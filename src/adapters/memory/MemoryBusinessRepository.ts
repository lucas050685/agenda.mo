import { BusinessRepository } from "@core/interfaces";
import { Business, SavedBusiness } from "@core/types";
import { createEntityBase } from './createEntityBase';

const businessDatabase: Map<string, SavedBusiness> = new Map();

export class MemoryBusinessRepository implements BusinessRepository {
  async save(business: Business): Promise<SavedBusiness> {
    const savedBusiness = {
      ...createEntityBase(),
      ...business,
    }
    businessDatabase.set(savedBusiness.id, savedBusiness);
    return {...savedBusiness};
  }

  clear() {
    businessDatabase.clear();
  }
}
