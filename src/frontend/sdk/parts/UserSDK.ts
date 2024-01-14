import { User } from '@/core/types';
import { Adapters } from "../types";
import { checkpoint } from '@/frontend/helpers';

export class UserSDK {
  constructor(private readonly adapters: Adapters){ 
  }

  async create(userDraft: User): Promise<any> {
    checkpoint(userDraft);
    const url = 'api/user';
    const result = await this.adapters.http.post(url, {
      body: userDraft
    });

    return result;
  }
}
