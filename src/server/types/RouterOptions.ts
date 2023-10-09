import { HTTPPresenter } from "@server/interface/HTTPPresenter";

export type RouterOptions = {
  successPresenter: HTTPPresenter;
  errorPresenter: HTTPPresenter;
  notFoundPresenter?: HTTPPresenter
  unauthenticatedPresenter?: HTTPPresenter;
}
