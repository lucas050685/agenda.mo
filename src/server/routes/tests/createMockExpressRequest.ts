import { mock } from 'bun:test';
import { Request } from 'express';

type Options = {
  headers?: Record<string, string>;
  body?: any;
}

const defaultOptions: Options = {
  headers: {},
}

export function createMockExpressRequest(options: Options = defaultOptions): Request {
  const req = {
    ...options,
  } as Request
  return req;
}
