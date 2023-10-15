import jwt from 'jsonwebtoken';
import { TokenizerAdapter } from "@/core/interfaces";

export class SystemTokenizerAdapter implements TokenizerAdapter {
  private readonly secret: string;
  
  constructor(secret: string){
    this.secret = secret; 
  }

  async tokenize(data: any): Promise<string> {
    const token = jwt.sign(data, this.secret);
    return token;
  }

  async decode<T = any>(token: string): Promise<T> {
    const data = jwt.decode(token);
    return data as T;
  }

  async validate(token: string): Promise<boolean> {
    try{
      jwt.verify(token, this.secret);
      return true;
    } catch {
      return false;
    }
  }
}
