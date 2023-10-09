import { WhereStatement } from "@core/types";

export interface GeneralInterface <GeneralEntity = any, GeneralSavedEntity = any> {
  save(entity: GeneralEntity): Promise<GeneralSavedEntity>;
  getById(id: string): Promise<GeneralSavedEntity | undefined>;
  where(where: WhereStatement | WhereStatement[]): Promise<GeneralSavedEntity[]>;
  update(entity: GeneralSavedEntity): Promise<GeneralSavedEntity>;
}
