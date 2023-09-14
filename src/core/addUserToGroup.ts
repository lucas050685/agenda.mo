
export namespace addUserToGroup {
  export type Params = {
    userId: string;
    groupId: string;
    roleId?: string;
  };

  export type Adapters = {

  }
}

export async function addUserToGroup({}: addUserToGroup.Params, adapters: addUserToGroup.Adapters): Promise<void>{

}
