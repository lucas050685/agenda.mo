import { PlaceRepository } from "@/core/interfaces";
import { Place, SavedPlace } from "@/core/types";
import { createEntityBase } from "./createEntityBase";
import { clone } from './clone';

const placeDatabase: Map<string, SavedPlace> = new Map();

export class MemoryPlaceRepository implements PlaceRepository {
  async save(place: Place): Promise<SavedPlace> {
    const savedPlace = {
      ...clone(place),
      ...createEntityBase(),
    }
    placeDatabase.set(savedPlace.id, savedPlace);
    return {...savedPlace};
  }

  clear() {
    placeDatabase.clear();
  }
}