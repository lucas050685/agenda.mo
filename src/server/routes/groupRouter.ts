import { Router } from "express";
import { RouterOptions } from "@/server/types";
import { createGroup } from '@/core'
import { getGroupsByUser } from "@/core/getGroupsByUser";
import { EventBus, GroupRepository, RoleRepository, TokenizerAdapter, UserRepository } from "@/core/interfaces";
import { AuthMiddleware } from "./AuthMiddleware";
import { defaultOptions } from "./defaultOptions";

export namespace groupRouter {
  export type Adapters = {
    tokenizerAdapter: TokenizerAdapter;
    groupRepository: GroupRepository;
    userRepository: UserRepository;
    roleRepository: RoleRepository;
    eventBus: EventBus;
  };
}

type Adapters = groupRouter.Adapters;

export function groupRouter(adapters: Adapters, options?: RouterOptions): Router {
  const router = Router();
  const authMiddleware = AuthMiddleware(adapters);

  const { successPresenter, errorPresenter } = {
    ...defaultOptions,
    ...options,
  }

  router.post('/', authMiddleware, async (req, res) =>{
    const groupData = {
      ...req.body,
      admin: req.user?.id,
    }

    try{
      const group = await createGroup(groupData, adapters);
      return successPresenter.present({group}, res);
    } catch (e) {
      return errorPresenter.present(e, res);
    }
  });

  router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return errorPresenter.present(`User is not defined`, res);
    try{
      const groups = await getGroupsByUser({ userId }, adapters);
      return successPresenter.present({ groups }, res);
    } catch (e: any) {
      return errorPresenter.present(e, res);
    }
  });

  return router;
}