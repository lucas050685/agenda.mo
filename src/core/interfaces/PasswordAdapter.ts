export interface PasswordAdapter {
  hash(password: string): Promise<[string, Record<string, any>]>
  compare(password: string, hash: string, details: Record<string, any>): Promise<boolean>;
}
