import { HTTPPresenter } from "@/server/interface/HTTPPresenter";
import { Response } from "express";

export class ExpressUnauthenticatedPresenter implements HTTPPresenter {
  present(error: any, res: Response) {
    res.status(401);
    const errorMessage = error?.toString ? error?.toString() : 'unknow error';

    return res.json({
      status: 'unauthenticated',
      message: `Unauthenticated; ${errorMessage}`.trim(),
    });
  }
}
