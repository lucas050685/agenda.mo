import { beforeEach, describe, it, expect } from 'bun:test';
import { createMemoryAdapters } from './createMemoryAdapters';
import { createState } from './createState';
import { Place } from '../types';
import { createPlace } from '@core/createPlace';
import { NoExistentGroup } from '@core/errors';

describe('Create a place', async ()=>{
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should create a simple place', async () => {
    const place: Place = {
      title: 'my place',
    }

    const savedPlace = await createPlace(place, adapters)

    expect(savedPlace.id).toBeString();
    expect(adapters.eventBus.emit).toHaveBeenCalledTimes(1);
    expect(adapters.eventBus.emit.mock.calls[0][0]).toBe('createPlace');
  });

  it('Should throw when apply a place to no existent group', async ()=>{
    const place: Place = {
      title: 'my place',
      groupId: '123',
    }

    expect(async () => createPlace(place, adapters)).toThrow(new NoExistentGroup('123'));
  })
});
