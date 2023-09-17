import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { Rendezvous } from '@core/types';
import { createMockDates } from './createMockDates';
import { createInvitations } from '@core/createInvitations';

describe('Create invitations', async ()=>{
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());
  const { tomorrow } = createMockDates();

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should create a invitation', async () => {
    const rendezvous: Rendezvous = {
      groupId: state.group.id,
      date: tomorrow.toISOString(),
      title: 'my event',
    }
    const savedRendezvous = await adapters.rendezvousRepository.save(rendezvous)
    const input = {
      rendezvousId: savedRendezvous.id,
      userIds: [state.user.id],
    };

    const invitations = await createInvitations(input, adapters);

    expect(invitations).toBeArray();
    expect(invitations.length).toBe(1);
    expect(invitations[0].id).toBeString();
  });
});
