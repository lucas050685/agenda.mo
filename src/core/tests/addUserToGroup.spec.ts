import { beforeEach, describe, it, expect } from 'bun:test';
import { MemoryUserRepository } from '@adapters/memory/MemoryUserRepository';
import { MemoryGroupRepository } from '@adapters/memory/MemoryGroupRepository';
import { MemoryRoleRepository } from '@adapters/memory/MemoryRoleRepository';
import { createUser } from '../createUser';
import { createGroup } from '../createGroup';
import { addUserToGroup } from '../addUserToGroup';

describe("Add user to group", ()=>{
  const user1 = { email: 'johnny@agendamo.net' }
  const user2 = { email: 'jude@agendamo.net' }
  const userRepository = new MemoryUserRepository();
  const groupRepository = new MemoryGroupRepository();
  const roleRepository = new MemoryRoleRepository();
  const adapters = { userRepository, groupRepository, roleRepository };

  beforeEach(()=>{
    userRepository.clear();
    groupRepository.clear();
    roleRepository.clear();
  });

  it("Should add a user to a group", async ()=>{
    const admin = await createUser(user1, { userRepository });
    const user = await createUser(user2, { userRepository });
    const groupInput = { admin: admin.id, title: 'my group' };
    const group = await createGroup(groupInput, { userRepository, groupRepository, roleRepository })

    const input = { userId: user.id, groupId: group.id };
    const roleIds = await addUserToGroup(input, adapters);
    
    expect(roleIds).toBeArray();
    expect(roleIds.length).toBe(1);
  })
});
