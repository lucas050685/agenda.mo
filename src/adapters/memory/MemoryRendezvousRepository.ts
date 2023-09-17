import { RendezvousRepository } from "@core/interfaces";
import { Rendezvous, SavedRendezvous } from "@core/types";
import { createEntityBase } from "./createEntityBase";

const rendezvousDatabase: Map<string, SavedRendezvous> = new Map();

export class MemoryRendezvousRepository implements RendezvousRepository {
  async save(rendezvous: Rendezvous): Promise<SavedRendezvous> {
    const savedRendezvous: SavedRendezvous = {
      ...createEntityBase(),
      ...rendezvous
    }
    rendezvousDatabase.set(savedRendezvous.id, savedRendezvous);
    return {...savedRendezvous};
  }

  async getById(rendezvousId: string): Promise<SavedRendezvous | undefined> {
    return rendezvousDatabase.get(rendezvousId);
  }
  
  clear() {
    rendezvousDatabase.clear();
  }
}
