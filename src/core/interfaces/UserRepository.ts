import { User, SavedUser } from "@core/types"

export interface UserRepository {
  save(user: User): Promise<SavedUser>
  getByEmail(email: string): Promise<SavedUser | undefined>
  getById(id: string): Promise<SavedUser | undefined>
}
