import { Rendezvous, SavedRendezvous } from "@core/types";

export interface RendezvousRepository {
  save(rendezvous: Rendezvous): Promise<SavedRendezvous>;
  getById(rendezvousId: string): Promise<SavedRendezvous | undefined>;
}
