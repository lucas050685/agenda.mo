import { User, SavedUser, WhereStatement } from "@/core/types"
import { GeneralInterface } from "./GeneralRepository"

export interface UserRepository extends GeneralInterface<User, SavedUser> {
  getByEmail(email: string): Promise<SavedUser | undefined>
}
