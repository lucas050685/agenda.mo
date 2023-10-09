import { WhereStatement } from '@core/types';
import { describe, expect, it } from 'bun:test';
import { match } from '../match';

describe('Match object', () => {
  it.each([
    { name: 'Johnny' },
    { name: 'Johnny', age: 18 },
  ])
  ('Should match simple values', (sample: any) => {
    const where: WhereStatement = { name: 'Johnny' };

    expect(match(sample, where)).toBeTrue();
  });

  it.each([
    { name: 'Johnny' },
    { name: 'Johnny', age: 18 },
  ])
  ('Should not match simple values', (sample: any) => {
    const where: WhereStatement = { name: {not: 'Johnny'} };

    expect(match(sample, where)).toBeFalse();
  });

  it.each([
    { name: 'Johnny' },
    { age: 18 },
    { name: 'Johnny', age: 18 },
  ])('Should not match a simple value', (sample: any) => {
    const where: WhereStatement = { name: 'Bryan' };

    expect(match(sample, where)).toBeFalse();
  });

  it.each([
    [{ name: 'Johnny' }, true],
    [{ name: 'Joanna' }, false],
  ])('Should match a complex condition', (...args) => {
    const [sample, result] = args;
    const where: WhereStatement = {
      name:{
        like: '*nny',
      }
    }

    expect(match(sample as any, where)).toBe(result);
  });

  it.each([
    [{ age: '19' }, true],
    [{ age: 19 }, true],
    [{ age: '18' }, false],
    [{ age: 18 }, false],
    [{ age: '17.9' }, false],
    [{ age: 17.9 }, false],
    [{ age: '18.9' }, true],
    [{ age: 18.9 }, true],
    [{ age: '19.1' }, true],
    [{ age: 19.1 }, true],
  ])('Should match a greater than condition', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      age:{
        greaterThan: 18,
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ age: '19' }, false],
    [{ age: 19 }, false],
    [{ age: '18' }, false],
    [{ age: 18 }, false],
    [{ age: '17.9' }, true],
    [{ age: 17.9 }, true],
    [{ age: '18.9' }, false],
    [{ age: 18.9 }, false],
    [{ age: '19.1' }, false],
    [{ age: 19.1 }, false],
  ])('Should match a less than condition', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      age:{
        lessThan: 18,
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ age: '19' }, true],
    [{ age: 19 }, true],
    [{ age: '18' }, true],
    [{ age: 18 }, true],
    [{ age: '17.9' }, false],
    [{ age: 17.9 }, false],
    [{ age: '18.9' }, true],
    [{ age: 18.9 }, true],
    [{ age: '19.1' }, true],
    [{ age: 19.1 }, true],
  ])('Should match a greater than condition', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      age:{
        greaterThanEqualTo: 18,
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ age: '19' }, false],
    [{ age: 19 }, false],
    [{ age: '18' }, true],
    [{ age: 18 }, true],
    [{ age: '17.9' }, true],
    [{ age: 17.9 }, true],
    [{ age: '18.9' }, false],
    [{ age: 18.9 }, false],
    [{ age: '19.1' }, false],
    [{ age: 19.1 }, false],
  ])('Should match a less than condition', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      age:{
        lessThanEqualTo: 18,
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ name: 'Johnny', age: 18 }, true],
    [{ name: 'Johnny', age: 17 }, false],
    [{ name: 'Bryan', age: 18 }, false],
    [{ name: 'Carl', age: 19 }, true],
  ])('Should match a complex object with a complex condition', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      name: {
        not: {
          like: 'B*'
        }
      },
      age: {
        greaterThanEqualTo: 18
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{name: 'Johnny', age: 17}, true],
    [{name: 'Bryan', age: 19}, true],
    [{name: 'Bryan', age: 17}, false],
  ])('Should match an OR statement', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement[] = [
      { name: 'Johnny' },
      { age: { greaterThan: 18 }}
    ]
  })

  it.each([
    [{name: 'Johnny'}, true],
    [{name: 'Bryan'}, true],
    [{name: 'Carl'}, false],
  ])('Should match when includes', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      name: {
        in: ['Johnny', 'Bryan'],
      },
    };

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ids: ['1', '2', '3']}, false],
    [{ids: ['1', '2', '3', '4']}, true],
    [{ids: ['1', '2', '3', 4]}, true],
  ])('Should match when contains', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      ids: {
        contains: '4'
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ids: ['1', '2', '3']}, false],
    [{ids: ['1', '2', '3', '4']}, true],
    [{ids: ['1', '2', '3', 4]}, true],
    [{ids: ['2', '3', '4']}, false],
    [{ids: ['1', '4']}, true],
  ])('Should match when contains elements from array', (...args) => {
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      ids: {
        contains: [1, '4']
      }
    }

    expect(match(sample, where)).toBe(result);
  });

  it.each([
    [{ date: '2023-01-02T00:00:00.000Z' }, true],
    [{ date: '2022-01-02T00:00:00.000Z' }, false],
    [{ date: '2023-01-01T12:00:00.000Z' }, true],
    [{ date: '2023-01-01T12:00:01.000Z' }, true],
    [{ date: '2023-01-01T11:59:59.000Z' }, false],
  ])('Should match a date after', (...args)=>{
    const [sample, result] = args as [any, boolean];
    const where: WhereStatement = {
      date: {
        after: '2023-01-01T12:00:00.000Z'
      }
    };

    expect(match(sample, where)).toBe(result);
  })
});
