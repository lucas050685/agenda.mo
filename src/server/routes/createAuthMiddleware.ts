import { NextFunction, Response, Request, Handler } from "express";
import { RouterOptions } from "@server/types";
import { defaultOptions } from './defaultOptions'
import { validateUserToken } from "@core/validateUserToken";
import { TokenizerAdapter, UserRepository } from "@core/interfaces";

function getAcessToken(req: Request): string | undefined {
  const authorizationHeaderName = 'Authorization';
  const authorizationString = req.headers[authorizationHeaderName];
  if (typeof authorizationString !== 'string') return undefined;
  const token = authorizationString.split(' ')[1];
  return token;
}

export namespace createAuthMiddleware {
  export type Adapters = {
    userRepository: UserRepository;
    tokenizerAdapter: TokenizerAdapter;
  }
}

type Adapters = createAuthMiddleware.Adapters;

export function createAuthMiddleware(adapters: Adapters, options?: RouterOptions): Handler {
  
  const { 
    successPresenter,
    notFoundPresenter,
    errorPresenter,
    unauthenticatedPresenter,
  } = {
    ...defaultOptions,
    ...options,
  }

  const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = getAcessToken(req);
    if (!token) return unauthenticatedPresenter.present(`Token is missing`, res);

    try{
      const userData = await validateUserToken(token, adapters);
      req.user = userData;
    } catch(e: any){
      return unauthenticatedPresenter.present(e, res);
    }

    next();
  };

  return middleware;
}
