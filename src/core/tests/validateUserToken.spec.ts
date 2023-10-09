import { describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { validateUserToken } from '@core/validateUserToken';

describe("Validate user token", async () => {
  const adapters = createMemoryAdapters();

  it("Should validate a user token", async () => {
    const userData = { 
      id: "any-id",
      email: "johnny@agendamo.net",
      createdAt: "2023-10-31T10:00:00.000Z",
      updatedAt: "2023-10-31T10:00:00.000Z",
    };
    const token = await adapters.tokenizerAdapter.tokenize(userData);

    const savedUser = await validateUserToken(token, adapters);

    expect(savedUser).toMatchObject(userData);
  });
})
