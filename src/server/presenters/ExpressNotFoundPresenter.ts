import { HTTPPresenter } from "@server/interface/HTTPPresenter";
import { Response } from "express";

export class ExpressNotFoundPresenter implements HTTPPresenter {
  present(data: any, res: Response) {
    res.status(400);
    return res.json({
      status: 'fail',
      message: data,
    })
  }
}