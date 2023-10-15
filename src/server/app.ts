import express from 'express';
import cors from 'cors';
import { AppConfig } from './types';

export function createApp(appConfig: AppConfig){
  const app = express();
  app.use(express.json());
  app.use(cors());

  if (appConfig.publicFolder) app.use(express.static(appConfig.publicFolder));

  app.set('port', appConfig.port);

  const defaultListen = app.listen;
  app.listen = (...args: any[]) => {
    console.log(`Server is running on port ${app.get('port')}`);
    return defaultListen.call(app, [...args]);
  }

  return app;
}
