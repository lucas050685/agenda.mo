import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { getRendezvousByUser } from '../getRendezvousByUser';

describe('get rendezvous by user', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocksWithRendezvous());

  beforeEach(async () => {
    adapters.clear();
    updateState(await adapters.pushMocksWithRendezvous());
  });

  it('Shoud get a array of rendezvous by a given userId', async () => {
    const params: getRendezvousByUser.Params = {
      userId: state.user.id,
    }

    const rendezvous = await getRendezvousByUser(params, adapters)

    expect(rendezvous).toBeArray();
    expect(rendezvous.length).toBe(1);
  });
});
