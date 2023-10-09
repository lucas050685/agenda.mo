import { describe, expect, it } from 'bun:test';
import { SystemTokenizerAdapter } from '..';

describe("System tokenizer adapter", ()=>{
  const secret = "my secret";
  const falseSecret = "my false secret";
  const tokenizerAdapter = new SystemTokenizerAdapter(secret);

  it("Should create a simple JWT", async () =>{
    const data = { username: "Bryan" };
    
    const token = await tokenizerAdapter.tokenize(data);

    expect(token).toBeString();
    expect(token.split(".").length).toBeGreaterThanOrEqual(3);
  });

  it("Should decode a simple JWT", async () => {
    const data = { username: "Bryan" };
    const token = await tokenizerAdapter.tokenize(data);

    const dec = await tokenizerAdapter.decode(token);

    expect(dec).toMatchObject(data);
  });

  it("Should validate a singature", async () => {
    const falseTokenizer = new SystemTokenizerAdapter(falseSecret);
    const data = { username: "Bryan" };
    const token = await tokenizerAdapter.tokenize(data);
    const falseToken = await falseTokenizer.tokenize(data);

    const dec = await falseTokenizer.decode(token);
    const validate = await tokenizerAdapter.validate(token);
    const falsebValidate = await tokenizerAdapter.validate(falseToken);

    expect(dec).toMatchObject(data);
    expect(validate).toBeTrue();
    expect(falsebValidate).toBeFalse();
  })
});
