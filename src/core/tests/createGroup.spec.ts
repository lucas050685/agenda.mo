import { beforeEach, describe, expect, it } from 'bun:test';
import { createGroup } from '../createGroup';
import { createUser } from '../createUser';
import { Group } from '../types';
import { createMemoryAdapters } from './createMemoryAdapters';

describe("Create group", ()=>{
  const adapters = createMemoryAdapters();
  const userMock = { email: 'johnny@agendamo.net' }

  beforeEach(()=>{
    adapters.clear();
  })

  it("Should create a simple group with a default role in it", async ()=>{
    const user = await createUser(userMock, adapters)
    const group: Group = {
      admin: user.id,
      title: 'my group',
    }

    const savedGroup = await createGroup(group, adapters);

    expect(savedGroup.id).toBeString();
    const roles = await adapters.roleRepository.getByGroupId(savedGroup.id);
    expect(roles).toBeArray();
    expect(roles.length).toBe(1);
  })

  it("Should throw when admin user does not exist", async ()=>{
    const group: Group = {
      admin: 'abc',
      title: 'my group',
    }

    expect(async () => createGroup(group, adapters)).toThrow();
  })
});