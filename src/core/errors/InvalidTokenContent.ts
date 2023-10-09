export class InvalidTokenContent extends Error {
  constructor(message?: string){
    super(`Token content is not valid\n${message}`.trim());
  }
}
