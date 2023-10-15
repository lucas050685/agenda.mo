import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { getUsersByGroup } from '@/core/getUsersByGroup';

describe('Get users by group', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should retieve users from a group', async () => {
    const userDraft = { email: 'test@agendamo.net' };
    const user = await adapters.userRepository.save(userDraft);
    state.role.userIds = state.role.userIds ? state.role.userIds.concat([user.id]) : [user.id];
    await adapters.roleRepository.update(state.role);

    const users = await getUsersByGroup({groupId: state.group.id}, adapters);

    expect(users).toBeArray();
    expect(users.length).toBe(2);
  });
});
