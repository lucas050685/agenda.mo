import { NextFunction, Response, Request, Handler } from "express";
import { RouterOptions } from "@/server/types";
import { validateUserToken } from "@/core/validateUserToken";
import { TokenizerAdapter, UserRepository } from "@/core/interfaces";
import { defaultOptions } from './defaultOptions'

function getAcessToken(req: Request): string | undefined {
  const authorizationHeaderName = 'Authorization';
  const authorizationString = req.headers[authorizationHeaderName] ?? req.headers[authorizationHeaderName.toLocaleLowerCase()];
  if (typeof authorizationString !== 'string') return undefined;
  const token = authorizationString.split(' ')[1];
  return token;
}

export namespace authMiddleware {
  export type Adapters = {
    userRepository: UserRepository;
    tokenizerAdapter: TokenizerAdapter;
  }
}

type Adapters = authMiddleware.Adapters;

export function AuthMiddleware(adapters: Adapters, options?: RouterOptions): Handler {
  
  const { unauthenticatedPresenter } = {
    ...defaultOptions,
    ...options,
  }

  const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = getAcessToken(req);
    if (!token) return unauthenticatedPresenter.present(`Token is missing or malformed`, res);

    try{
      const userData = await validateUserToken(token, adapters);
      req.user = userData;
    } catch(e: any){
      return unauthenticatedPresenter.present(e, res);
    }

    return next();
  };

  return middleware;
}
