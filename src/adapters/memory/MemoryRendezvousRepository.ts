import { RendezvousRepository } from "@/core/interfaces";
import { Rendezvous, SavedRendezvous, WhereStatement } from "@/core/types";
import { createEntityBase } from "./createEntityBase";
import { match } from "./match";

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

  async where(where: WhereStatement | WhereStatement[]): Promise<SavedRendezvous[]> {
    const allRendezvous = [...rendezvousDatabase.values()];
    return allRendezvous
      .filter((rendezvous) => match(rendezvous, where))
      .map((rendezvous) => ({...rendezvous}));
  }
  
  clear() {
    rendezvousDatabase.clear();
  }
}
