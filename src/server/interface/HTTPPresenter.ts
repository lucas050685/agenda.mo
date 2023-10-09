import { Response } from "express"

export interface HTTPPresenter<ResponseType = Response>{
  present(data: any, res: ResponseType): any
}

export interface HTTPClassContructor<ResponseType = Response> {
  new (res: ResponseType): HTTPPresenter
}
