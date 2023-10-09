import { emitEvent } from "./emitEvent";
import { NoExistentGroup } from "./errors";
import { EventBus, GroupRepository, PlaceRepository } from "./interfaces";
import { SavedPlace, Place } from "./types";

export namespace createPlace {
  export type Adapters = {
    groupRepository: GroupRepository;
    placeRepository: PlaceRepository;
    eventBus: EventBus;
  }
}

type Adapters = createPlace.Adapters;

export async function createPlace(place: Place, adapters: Adapters): Promise<SavedPlace> {
  if (place.groupId) {
    const group = await adapters.groupRepository.getById(place.groupId);
    if (!group) throw new NoExistentGroup(place.groupId);
  }
  const savedPlace = await adapters.placeRepository.save(place);
  emitEvent({eventName: 'createPlace', body: {...savedPlace}}, adapters);
  return savedPlace;
}
