import { SavedBusiness } from "@core/types";

export interface BusinessRepository {
  save(business: Business): Promise<SavedBusiness>;
}
