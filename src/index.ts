import { createMemoryAdapters } from '@factories/createMemoryAdapters';
import { createApp } from '@server/app';
import { userRouter, groupRouter } from '@server/routes';

import { config } from './app.config';

const adapters = createMemoryAdapters();
const app = createApp(config);

app
  .use('/api/user', userRouter(adapters))
  .use('/api/group', groupRouter(adapters));

app.listen();
