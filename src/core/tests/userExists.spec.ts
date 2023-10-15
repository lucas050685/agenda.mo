import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { userExists } from '@/core/userExists';

describe('User exists', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  })

  it('Should return true when user exists', async () => {
    const userId = state.user.id;

    const doesUserExist = await userExists(userId, adapters.userRepository);

    expect(doesUserExist).toBeTrue();
  });
})