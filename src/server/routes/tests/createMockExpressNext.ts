import { mock } from "bun:test";
import { NextFunction } from "express";

export function createMockExpressNext() {
  return mock(()=> {
    // void
  }) as NextFunction;
}
