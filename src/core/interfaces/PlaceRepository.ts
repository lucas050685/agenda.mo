import { SavedPlace, Place } from "@/core/types";

export interface PlaceRepository {
  save(place: Place): Promise<SavedPlace>;
}
