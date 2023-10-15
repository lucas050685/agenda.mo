import { HTTPPresenter } from "@/server/interface/HTTPPresenter";
import { Response } from "express";

export class ExpressSuccessPresenter implements HTTPPresenter {
  present(data: any, res: Response) {
    res.status(200);
    const defaultResponse: Record<string, any> = { status: 'ok' };

    if (Array.isArray(data)){
      return res.json({
        ...defaultResponse,
        count: data.length,
        result: data
      });
    }
    
    return res.json({
      ...defaultResponse,
      ...data
    });
  }
}