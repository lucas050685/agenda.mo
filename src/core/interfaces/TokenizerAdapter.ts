export interface TokenizerAdapter {
  tokenize(data: any): Promise<string>;
  validate(token: string): Promise<boolean>;
  decode<T = any>(token: string): Promise<T>;
}
