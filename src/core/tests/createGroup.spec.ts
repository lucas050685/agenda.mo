import { beforeEach, describe, expect, it } from 'bun:test';
import { createGroup } from '../createGroup';
import { createUser } from '../createUser';
import { Group } from '../types';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';

describe("Create group", async ()=>{
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  })

  it("Should create a simple group with a default role in it", async ()=>{
    const group: Group = {
      admin: state.user.id,
      title: 'my group',
    }

    const savedGroup = await createGroup(group, adapters);

    expect(savedGroup.id).toBeString();
    const roles = await adapters.roleRepository.getByGroupId(savedGroup.id);
    expect(roles).toBeArray();
    expect(roles.length).toBe(1);
    expect(adapters.eventBus.emit).toHaveBeenCalledTimes(2);
    expect(adapters.eventBus.emit.mock.calls[0][0]).toBe('createGroup');
    expect(adapters.eventBus.emit.mock.calls[1][0]).toBe('createDefaultRole');;
  })

  it("Should throw when admin user does not exist", async ()=>{
    const group: Group = {
      admin: 'abc',
      title: 'my group',
    }

    expect(async () => createGroup(group, adapters)).toThrow();
  })
});