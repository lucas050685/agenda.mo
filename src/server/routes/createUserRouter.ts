import { Router } from "express";
import { createUser, getUserById } from '@core';
import { EventBus, PasswordAdapter, UserRepository } from "@core/interfaces";
import { NoExistentUser } from "@core/errors";
import { RouterOptions } from "@server/types";
import { defaultOptions } from './defaultOptions'

export namespace createUserRouter {
  export type Adapters = {
    userRepository: UserRepository;
    eventBus: EventBus;
    passwordAdapter: PasswordAdapter;
  }
}

type Adapters = createUserRouter.Adapters;

export function createUserRouter(adapters: Adapters, options?: RouterOptions): Router {
  const userRouter = Router();
  const { 
    successPresenter,
    notFoundPresenter,
    errorPresenter,
  } = {
    ...defaultOptions,
    ...options,
  }

  userRouter.post("/", async (req, res)=>{
    const body = req.body;
    try {
      const user = await createUser(body, adapters);
      return successPresenter.present({ id: user.id }, res);
    } catch (e: any) {
      return errorPresenter.present(e, res);
    }
  });

  userRouter.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await getUserById({ userId }, adapters);
    
    if (user) return successPresenter.present({ user }, res);

    return notFoundPresenter.present(new NoExistentUser(userId).message, res);
  });

  userRouter.post("/auth", async (req, res) =>{
    const token = '123';
    res.send({ message: 'ok'});
  });

  return userRouter;
}
