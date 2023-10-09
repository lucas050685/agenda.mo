import { describe, it, expect } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { getRendezvousByGroup } from '@core/getRendezvousByGroup';

describe('Get rendezvous by group', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocksWithRendezvous());

  it('Should get all groups from a specifc rendezvous', async () => {
    const groupId = state.group.id;
    const rendezvouss = await getRendezvousByGroup({ groupId }, adapters);

    expect(rendezvouss).toBeArray();
    expect(rendezvouss.length).toBe(1);
  });
});
