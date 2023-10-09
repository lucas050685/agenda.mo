export class NoExistentRole extends Error {
  constructor(roleId: string){
    const message = `Role ${roleId} does not exist`;
    super(message);
  }
}
