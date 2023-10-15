import { createMemoryAdapters } from '@/core/tests/createMemoryAdapters';
import { createState } from '@/core/tests/createState';
import { SystemTokenizerAdapter } from '@/adapters/system';
import { describe, expect, it } from 'bun:test';
import { createMockExpressRequest } from './createMockExpressRequest';
import { AuthMiddleware } from '../AuthMiddleware';
import { createMockExpressResponse } from './createMockExpressResponse';
import { createMockExpressNext } from './createMockExpressNext';

describe("Auth middleware", async () => {
  const adapters = createMemoryAdapters();
  const [state] = createState(await adapters.pushMocks());

  it("Should call the next function when a proper token is given", async () => {
    const token = await adapters.tokenizerAdapter.tokenize(state.user);
    const tokenString = `Bearer ${token}`;
    const req = createMockExpressRequest({
      headers: { 'Authorization': tokenString }
    });
    const res = createMockExpressResponse();
    const next = createMockExpressNext();

    const middleware = AuthMiddleware(adapters);

    await middleware(req, res, next);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(req.user).toMatchObject(state.user);
    expect(next).toHaveBeenCalled();
  });

  it("Should call response with a unauthenticated message", async () => {
    const tokenizerAdapter = new SystemTokenizerAdapter('my mock secret');
    const token = await tokenizerAdapter.tokenize(state.user);
    const tokenString = `Bearer ${token}`;
    const req = createMockExpressRequest({
      headers: { 'Authorization': tokenString }
    });
    const res = createMockExpressResponse();
    const next = createMockExpressNext();

    const middleware = AuthMiddleware(adapters);

    await middleware(req, res, next);

    expect(req.user).toBeUndefined();
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
