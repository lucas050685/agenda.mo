import { beforeEach, describe, expect, it } from 'bun:test';
import { createGroup } from '../createGroup';
import { createUser } from '../createUser';
import { Group } from '../types';
import { MemoryGroupRepository } from '@adapters/memory/MemoryGroupRepository';
import { MemoryUserRepository } from '@adapters/memory/MemoryUserRepository';

describe("Create group", ()=>{
  const userRepository = new MemoryUserRepository();
  const groupRepository = new MemoryGroupRepository();
  const adapters = { groupRepository, userRepository };
  const userMock = { email: 'johnny@agendamo.net' }

  beforeEach(()=>{
    groupRepository.clear();
    userRepository.clear();
  })

  it("Should create a simple group", async ()=>{
    const user = await createUser(userMock, { userRepository })
    const group: Group = {
      admin: user.id,
      title: 'my group',
    }

    const savedGroup = await createGroup(group, adapters);

    expect(savedGroup.id).toBeString();
  })

  it("Should throw when admin user does not exist", async ()=>{
    const group: Group = {
      admin: 'abc',
      title: 'my group',
    }

    expect(async () => createGroup(group, adapters)).toThrow();
  })
});