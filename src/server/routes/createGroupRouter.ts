import { Router } from "express";
import { RouterOptions } from "@server/types";
import { defaultOptions } from "./defaultOptions";
import { createGroup } from '@core'
import { EventBus, GroupRepository, RoleRepository, UserRepository } from "@core/interfaces";

export namespace createGroupRouter {
  export type Adapters = {
    groupRepository: GroupRepository;
    userRepository: UserRepository;
    roleRepository: RoleRepository;
    eventBus: EventBus;
  };
}

type Adapters = createGroupRouter.Adapters;

export function createGroupRouter(adapters: Adapters, options?: RouterOptions): Router {
  const groupRouter = Router();

  const { successPresenter } = {
    ...defaultOptions,
    ...options,
  }

  groupRouter.post('/', (req, res) =>{
    const groupData = req.body;
    try{
      const group = createGroup(groupData, adapters);
      successPresenter.present(group, res)
    } catch (e) {

    }
  })

  return groupRouter;
}