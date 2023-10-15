import { describe, expect, it } from 'bun:test';
import { authenticateUser } from '@/core/authenticateUser';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';

describe("Authenticate user", async() => {
  const adapters = createMemoryAdapters();
  const password = '123456'
  const [hash, details] = await adapters.passwordAdapter.hash(password);
  const userDraft = {
    email: 'johnny@agendamo.net',
    password: hash,
    passwordDetails: details,
  }
  const user = await adapters.userRepository.save(userDraft);

  const [state] = createState({ user });

  it("Should authenticate a user and generate a jwt", async () => {
    const token = await authenticateUser({ 
      email: userDraft.email,
      password,
    }, adapters);

    expect(token).toBeString();
  });
})