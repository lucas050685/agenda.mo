import { beforeEach, describe, it, expect } from 'bun:test';
import { addUserToGroup } from '../addUserToGroup';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { NoExistentUser } from '@core/errors';

describe("Add user to group", async ()=>{
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());
  
  const user1 = { email: 'johnny@agendamo.net' }

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it("Should add a user to a group", async ()=>{
    const user = await adapters.userRepository.save(user1);
    const input = { userId: user.id, groupId: state.group.id };

    const roleIds = await addUserToGroup(input, adapters);

    expect(roleIds).toBeArray();
    expect(roleIds.length).toBe(1);
    expect(adapters.eventBus.emit).toHaveBeenCalledTimes(2);
    expect(adapters.eventBus.emit.mock.calls[0][0]).toBe('addUserToRole');
    expect(adapters.eventBus.emit.mock.calls[1][0]).toBe('addUserToGroup');
  });

  it('Should throw when user does not exist', () => {
    const input = { userId: '123', groupId: state.group.id };
    
    expect(async () => addUserToGroup(input, adapters)).toThrow(new NoExistentUser('123'));
  });
});
