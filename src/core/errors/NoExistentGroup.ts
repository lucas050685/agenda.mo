export class NoExistentGroup extends Error {
  constructor(groupId: string){
    const message = `Group ${groupId} does not exist`;
    super(message);
  }
}
