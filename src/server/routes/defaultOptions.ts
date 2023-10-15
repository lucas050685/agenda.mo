import { 
  ExpressSuccessPresenter, 
  ExpressNotFoundPresenter,
  ExpressErrorPresenter,
  ExpressUnauthenticatedPresenter
} from "@/server/presenters";

export const defaultOptions = {
  successPresenter: new ExpressSuccessPresenter(),
  errorPresenter: new ExpressErrorPresenter(),
  notFoundPresenter: new ExpressNotFoundPresenter(),
  unauthenticatedPresenter: new ExpressUnauthenticatedPresenter(),
};
