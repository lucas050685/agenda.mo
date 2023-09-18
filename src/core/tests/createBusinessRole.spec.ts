import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { BusinessRole } from '@core/types';
import { createBusinessRole } from '@core/createBusinessRole';
import { NoExistentUser } from '@core/errors';

describe('Create business role', async ()=>{
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocksWithBusiness());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocksWithBusiness());
  });

  it('Should create a simple role', async () => {
    const businessRole: BusinessRole = {
      businessId: state.business.id,
      title: 'default',
      userIds: [state.user.id],
    };

    const savedBusinessRole = await createBusinessRole(businessRole, adapters);

    expect(savedBusinessRole.id).toBeString();
  });

  it('Should throw when user does not exist', () => {
    const businessRole: BusinessRole = {
      businessId: state.business.id,
      title: 'default',
      userIds: [state.user.id, '123'],
    };

    expect(async () => await createBusinessRole(businessRole, adapters)).toThrow();
  });
});
