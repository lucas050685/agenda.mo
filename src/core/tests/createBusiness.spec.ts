import { beforeEach, describe, expect, it } from 'bun:test';
import { createBusiness } from '@/core/createBusiness';
import { Business } from '@/core/types';
import { NoExistentUser } from '@/core/errors';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { address } from './address.mock';

describe('Create business', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should create a simple business', async () => {
    const business: Business = {
      admin: state.user.id,
      title: 'My Business',
      description: 'My Business description',
      email: 'mybusiness@agendamo.net',
      phoneNumbers: [],
      address,
    };

    const savedBusiness = await createBusiness(business, adapters);

    expect(savedBusiness.id).toBeString();
  });

  it('Should throw when create a business with a non existent user', async () => {
    const business: Business = {
      admin: '123',
      title: 'My Business',
      description: 'My Business description',
      email: 'mybusiness@agendamo.net',
      phoneNumbers: [],
      address,
    };

    expect(async ()=> createBusiness(business, adapters)).toThrow(new NoExistentUser('123'));
  });
});
