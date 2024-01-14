import { describe, expect, it } from 'bun:test';
import { emailValidator } from '../emailValidator';

describe("Email validation", ()=>{
  it("Should return a false when email is not valid", ()=>{
    const email = "my-email";

    expect(emailValidator(email)).toBeFalse();
  });

  it("Should return void when email is valid", ()=>{
    const email = 'my.email@me.com';
    
    expect(emailValidator(email)).toBeTrue();
  });
})