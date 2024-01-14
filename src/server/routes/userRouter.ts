import { Router } from "express";
import { createUser, getUserById } from '@/core';
import { EventBus, PasswordAdapter, TokenizerAdapter, UserRepository } from "@/core/interfaces";
import { NoExistentUser } from "@/core/errors";
import { authenticateUser } from "@/core/authenticateUser";
import { RouterOptions } from "@/server/types";
import { defaultOptions } from './defaultOptions';
import { AuthMiddleware } from "./AuthMiddleware";
import { checkpoint } from "@/frontend/helpers";

export namespace userRouter {
  export type Adapters = {
    tokenizerAdapter: TokenizerAdapter;
    userRepository: UserRepository;
    eventBus: EventBus;
    passwordAdapter: PasswordAdapter;
  }
}

type Adapters = userRouter.Adapters;

export function userRouter(adapters: Adapters, options?: RouterOptions): Router {
  const router = Router();
  const authMiddleware = AuthMiddleware(adapters);

  const { 
    successPresenter,
    notFoundPresenter,
    errorPresenter,
    unauthenticatedPresenter,
  } = {
    ...defaultOptions,
    ...options,
  }

  router.post("/", async (req, res) => {
    const body = req.body;
    try {
      const user = await createUser(body, adapters);
      return successPresenter.present({ id: user.id }, res);
    } catch (e: any) {
      return errorPresenter.present(e, res);
    }
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    const userId = req.params.id;
    const user = await getUserById({ userId }, adapters);
    
    if (user) return successPresenter.present({ user }, res);

    return notFoundPresenter.present(new NoExistentUser(userId).message, res);
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
      const token = await authenticateUser({ email, password }, adapters);
      return successPresenter.present({token}, res);
    }
    catch (e: any) {
      return unauthenticatedPresenter.present(`User name and password do not match`, res);
    }
  });

  return router;
}
