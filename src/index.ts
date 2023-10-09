import { createMemoryAdapters } from '@factories/createMemoryAdapters';
import { createApp } from '@server/app';
import { createUserRouter } from '@server/routes';

import { config } from './app.config';

const adapter = createMemoryAdapters();
const app = createApp(config);

app.use('/api/user', createUserRouter(adapter))

app.listen();
