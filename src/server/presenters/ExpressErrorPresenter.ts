import { HTTPPresenter } from "@server/interface/HTTPPresenter";
import { Response } from "express";

export class ExpressErrorPresenter implements HTTPPresenter {
  present(error: any, res: Response) {
    res.status(500);
    return res.json({
      status: 'error',
      message: error.message
    });
  }
}
