import { beforeEach, describe, expect, it } from 'bun:test';
import request from 'supertest';
import { createMemoryAdapters } from '@core/tests/createMemoryAdapters';
import { createUserRouter } from '../createUserRouter';
import { createMockApp } from './createMockApp';


describe('Create user router', async ()=>{
  const adapters = createMemoryAdapters();
  const router = createUserRouter(adapters);
  const app = createMockApp();
  app.use(router);

  beforeEach(async ()=>{
    adapters.clear();
    adapters.pushMocks();
  })

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
});
