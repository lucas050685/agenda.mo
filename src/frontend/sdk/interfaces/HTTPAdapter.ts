export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type Headers = Record<string, string>;

export type MutationOptions = {
  headers?: Headers;
  body?: any;
};

export type StaticOptions = {
  headers?: Headers;
};

export interface HTTPAdapter {
  get<T = any>(url: string, options?: StaticOptions): Promise<T>;
  post<T = any>(url: string, options?: MutationOptions): Promise<T>;
  put<T = any>(url: string, options?: MutationOptions): Promise<T>;
  delete<T = any>(url: string, options?: MutationOptions): Promise<T>;
}
