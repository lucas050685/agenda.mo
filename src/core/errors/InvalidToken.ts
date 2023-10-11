export class InvalidToken extends Error {
  constructor(message?: string){
    super(`Invalid Token\n${message ?? ''}`.trim());
  }
}