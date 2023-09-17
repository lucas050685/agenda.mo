import { Rendezvous } from '@core/types';
import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { createRendezvous } from '@core/createRendezvous';
import { createMockDates } from './createMockDates';

describe('Create rendezvous', async ()=>{
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());
  const {today, tomorrow} = createMockDates();

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should create a simple rendezvous', async ()=>{
    const rendezvous: Rendezvous = {
      date: tomorrow.toISOString(),
      groupId: state.group.id,
      title: 'my Event',
    }

    const savedRendezvou = await createRendezvous(rendezvous, adapters);

    expect(savedRendezvou.id).toBeString();
  });
});
