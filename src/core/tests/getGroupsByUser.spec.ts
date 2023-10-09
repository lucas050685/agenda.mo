import { beforeEach, describe, it, expect } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { getGroupsByUser } from '@core/getGroupsByUser';

describe('Get groups by user', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async () => {
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should get groups by user', async ()=>{
    const userId = state.user.id;
    await adapters.groupRepository.save({ title: 'mock group', admin: userId});
    
    const groups = await getGroupsByUser({ userId }, adapters);

    expect(groups).toBeArray();
    expect(groups.length).toBe(2);
  });
});
