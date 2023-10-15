import { beforeEach, describe, expect, it } from 'bun:test';
import request from 'supertest';
import { createMemoryAdapters } from '@/core/tests/createMemoryAdapters';
import { createState } from '@/core/tests/createState';
import { userRouter } from '../userRouter';
import { createMockApp } from './createMockApp';

describe('User router', async ()=>{
  const defaultHeaders = { Accept: 'application/json' };
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());
  const router = userRouter(adapters);
  const app = createMockApp();
  app.use(router);
  

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it('Should create a user', async ()=>{
    const body = {
      email: 'bob@agendamo.net'
    };

    const res = await request(app)
      .post('/')
      .send(body);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      status: 'ok',
      id: expect.any(String),
    });
  });

  it("Should login and receive a token", async () => {
    const body = {
      email: state.user.email,
      password: state.userPassword,
    };
    
    const response = await request(app)
      .post('/login')
      .set(defaultHeaders)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      token: expect.any(String),
    });
  });
});
