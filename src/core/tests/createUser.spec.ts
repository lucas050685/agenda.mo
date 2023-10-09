import { beforeEach, describe, expect, it } from 'bun:test';
import { createUser } from '../createUser';
import { createMemoryAdapters } from './createMemoryAdapters';

describe("Create user", ()=>{
  const adapters = createMemoryAdapters();

  beforeEach(()=>{
    adapters.clear();
  })

  it("Should create a simple user",  async ()=>{
    const userData = { email: "johnny@agendamo.net" };

    const user = await createUser(userData, adapters);

    expect(user.id).toBeString();
    expect(adapters.eventBus.emit).toHaveBeenCalledTimes(1);
    expect(adapters.eventBus.emit.mock.calls[0][0]).toBe('createUser');
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

  it("Should hash the user password", async () => {
    const user = { email: "johnny@agendamo.net", password: '123456' };

    const savedUser = await createUser(user, adapters);

    expect(savedUser.password).toBeString();
    expect(savedUser.password).not.toBeEmpty();
    expect(savedUser.password).not.toBe(user.password);
  });
});
