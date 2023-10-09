import express from 'express';

export function createMockApp() {
  const app = express();
  app.use(express.json());
  return app;
}
