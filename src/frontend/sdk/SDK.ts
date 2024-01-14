import { Adapters } from "./types";
import { UserSDK } from "./parts";

export class SDK {
  readonly user: UserSDK;

  constructor(private readonly adapters: Adapters){
    console.log('Creating sdk', adapters);
    this.user = new UserSDK(this.adapters);
  }
}