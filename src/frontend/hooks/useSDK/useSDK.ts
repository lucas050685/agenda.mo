import { 
  SDK,
  Adapters,
  FetchHTTPAdapter
} from "@/frontend/sdk";

const adapters: Adapters = {
  http: new FetchHTTPAdapter({
    baseUrl: 'http://localhost:3000',
  })
};

const sdk = new SDK(adapters);

export function useSDK() {
  return sdk;
}