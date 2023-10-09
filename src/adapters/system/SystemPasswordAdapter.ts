import { password as crypt } from 'bun'
import { PasswordAdapter } from "@core/interfaces";

export namespace SystemPasswordAdapter {
  export type Options = {
    
  }
}

type Options = SystemPasswordAdapter.Options;

const defaultOptions = {};

export class SystemPasswordAdapter implements PasswordAdapter {
  private readonly algo = 'bcrypt';
  private readonly options: Options;

  constructor(options?: Options){
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  async hash(password: string): Promise<[string,Record<string, any>]> {
    const hash = await crypt.hash(password, this.algo);
    return [hash, {}];
  }

  async compare(password: string, hash: string, details: Record<string, any>): Promise<boolean> {
    return await crypt.verify(password, hash, this.algo);
  }
}
