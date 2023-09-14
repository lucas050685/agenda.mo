import { beforeEach, describe, expect, it } from 'bun:test';
import { createUser } from '../createUser';
import { MemoryUserRepository } from '@adapters/memory/MemoryUserRepository';

describe("Create user", ()=>{
  const userRepository = new MemoryUserRepository();
  const adapters = { userRepository };

  beforeEach(()=>{
    userRepository.clear();
  })

  it("Should create a simple user",  async ()=>{
    const userData = { email: "johnny@agendamo.net" };

    const user = await createUser(userData, adapters);

    expect(user.id).toBeString();
  });

  it.each([
    '',
    'email',
    'myEmail@',
    undefined,
    null
  ])("Should throw when user email is not valid", async (email: any)=>{
    const user = { email: email as string };

    expect(async () => createUser(user, adapters)).toThrow();
  });

  it("Email should be unique", async () => {
    const user1 = { email: "johnny@agendamo.net" };
    const user2 = { email: "user2@agendamo.net" };
    const user3 = { email: "johnny@agendamo.net" };

    const savedUser1 = await createUser(user1, adapters);
    const savedUser2 = await createUser(user2, adapters);
    
    expect(savedUser1.id).toBeString();
    expect(savedUser2.id).toBeString();
    expect(async () => createUser(user3, adapters)).toThrow();
  });
});
