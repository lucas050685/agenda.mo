import { Rendezvous, SavedRendezvous, WhereStatement } from "@/core/types";

export interface RendezvousRepository {
  save(rendezvous: Rendezvous): Promise<SavedRendezvous>;
  getById(rendezvousId: string): Promise<SavedRendezvous | undefined>;
  where(where: WhereStatement | WhereStatement[]): Promise<SavedRendezvous[]>;
}
