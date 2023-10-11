import { mock } from "bun:test";
import { Response } from "express";

type Options = {

};

const defaultOptions: Options = {}

export function createMockExpressResponse(options: Options = defaultOptions){
  const res = {} as Response;

  res.status = mock((statusCode: number) => res);;
  res.send = mock((body: any) => res);
  res.json = mock((body: any) => res);

  return res;
}
