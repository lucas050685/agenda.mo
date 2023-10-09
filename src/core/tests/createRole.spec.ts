import { createRole } from '@core/createRole';
import { Role } from '@core/types';
import { beforeEach, describe, expect, it } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { NoExistentGroup } from '@core/errors';

describe('Create role', async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks())

  beforeEach(async ()=>{
    adapters.clear();
    updateState( await adapters.pushMocks());
  });

  it('Should create a simple role', async () => {
    const role: Role = {
      groupId: state.group.id,
      title: 'members',
    };

    const savedRole = await createRole(role, adapters);

    expect(savedRole.id).toBeString();
    expect(adapters.eventBus.emit).toHaveBeenCalledTimes(1);
    expect(adapters.eventBus.emit.mock.calls[0][0]).toBe('createRole');
  });

  it('Should throw when group does not exist', async () => {
    const role: Role = {
      groupId: '123',
      title: 'members',
    };

    expect(async () => createRole(role, adapters)).toThrow(new NoExistentGroup('123'));
  });
});
