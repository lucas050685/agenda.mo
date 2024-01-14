import { checkpoint } from "@/frontend/helpers";
import { HTTPAdapter, MutationOptions, StaticOptions, Headers, Methods } from "../interfaces/HTTPAdapter";

export namespace FetchHTTPAdapter {
  export type Optinos = {
    baseUrl?: string;
    headers?: Headers
  }
}

type Options = FetchHTTPAdapter.Optinos;

const defaultOptions = {
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json'
  },
}

export class FetchHTTPAdapter implements HTTPAdapter {
  private readonly options: Options;

  constructor(options?: Options){
    this.options = {
      ...defaultOptions,
      ...options,
    }
  }

  buildUrl(url: string): string {
    return `${this.options.baseUrl}/${url}`;
  }

  buildHeaders(headers?: Headers): Headers {
    return {
      ...this.options.headers,
      ...headers,
    }
  }

  buildBody(body?: any): string | undefined {
    if (!body) return undefined;
    if (typeof body === 'string') return body;
    try {
      const s = JSON.stringify(body);
      return s;
    } catch (e: any) {
      throw new Error('It was not possible to parse body request');
    }
  }

  engine() {
    return window?.fetch || fetch;
  }

  async present<T = any>(response: Response): Promise<T>{
    try{
      const body = await response.json();
      return body as T;
    } catch (e: any) {
      const body = await response.blob()
      return body.toString() as T;
    }
  }

  async get<T = any>(url: string, options?: StaticOptions): Promise<T> {
    const finalUrl = this.buildUrl(url);
    const headers = this.buildHeaders(options?.headers);
    const engine = this.engine();
    
    const response = await engine(finalUrl, { 
      headers, 
      method: Methods.GET 
    });

    return this.present<T>(response);
  }

  async post<T = any>(url: string, options?: MutationOptions): Promise<T> {
    const finalUrl = this.buildUrl(url);
    const headers = this.buildHeaders(options?.headers);
    const body = this.buildBody(options?.body);
    const engine = this.engine();
    checkpoint(finalUrl);
    const response = await engine(finalUrl, {
      headers,
      body,
      method: Methods.POST,
    });

    return this.present<T>(response);
  }

  async put<T = any>(url: string, options?: MutationOptions): Promise<T> {
    const finalUrl = this.buildUrl(url);
    const headers = this.buildHeaders(options?.headers);
    const body = this.buildBody(options?.body);
    const engine = this.engine();
    
    const response = await engine(finalUrl, {
      headers,
      body,
      method: Methods.PUT,
    });

    return this.present<T>(response);
  }

  async delete<T = any>(url: string, options?: MutationOptions): Promise<T> {
    const finalUrl = this.buildUrl(url);
    const headers = this.buildHeaders(options?.headers);
    const body = this.buildBody(options?.body);
    const engine = this.engine();
    
    const response = await engine(finalUrl, {
      headers,
      body,
      method: Methods.DELETE,
    });

    return this.present<T>(response);
  }
}
