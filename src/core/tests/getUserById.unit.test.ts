import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { getUserById } from '@core';

describe('Get user by id', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should return user data by its id', async () => {
    const userId = state.user.id;

    const user = await getUserById({ userId }, adapters);

    expect(user).not.toBeUndefined();
    expect((user as any).id).toBe(userId);
  });

  it('Should not return sensitive information when not required', async ()=>{
    const userId = state.user.id;

    const user = await getUserById({ userId }, adapters);

    expect(user).not.toBeUndefined();
    expect((user as any).password).toBeUndefined()
  })
});
