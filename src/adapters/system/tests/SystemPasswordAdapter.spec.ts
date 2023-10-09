import { describe, expect, it } from 'bun:test';
import { SystemPasswordAdapter } from '..';

describe("System password adapter", ()=>{
  const passwordAdapter = new SystemPasswordAdapter();

  it('Should create a hashed password', async () => {
    const password = '123456'

    const [hash] = await passwordAdapter.hash(password);

    expect(hash).toBeString();
  });

  it('Should create different hash for different pass', async () => {
    const password1 = '123456';
    const password2 = '654321';

    const [hash1] = await passwordAdapter.hash(password1);
    const [hash2] = await passwordAdapter.hash(password2);

    expect(hash1).not.toBe(hash2);
  });

  it('Should compare as true', async () => {
    const password = '123456'
    const [hash, details] = await passwordAdapter.hash(password);

    const compare = await passwordAdapter.compare(password, hash, details);

    expect(compare).toBeTrue()
  });

  it('Should compare as true', async () => {
    const password1 = '123456'
    const password2 = '654321'
    const [hash1, details1] = await passwordAdapter.hash(password1);
    const [hash2, details2] = await passwordAdapter.hash(password2);

    const compare1 = await passwordAdapter.compare(password1, hash2, details1);
    const compare2 = await passwordAdapter.compare(password1, hash2, details2);

    expect(compare1).toBeFalse();
    expect(compare2).toBeFalse();
  });

});
