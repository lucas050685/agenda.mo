export class NoExistentUser extends Error {
  constructor(userId: string){
    const message = `User ${userId} does not exist`;
    super(message);
  }
}
