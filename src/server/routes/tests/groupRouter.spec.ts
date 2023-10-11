import { beforeEach, describe, expect, it } from 'bun:test';
import request from 'supertest';
import { createMemoryAdapters } from '@core/tests/createMemoryAdapters';
import { createState } from '@core/tests/createState';
import { createMockApp } from './createMockApp';
import { groupRouter } from '../groupRouter';
import { SystemTokenizerAdapter } from '@adapters/system';

describe("Group Router", async () => {
  const adapters = createMemoryAdapters();
  const [state, updateState] = createState(await adapters.pushMocks());
  const router = groupRouter(adapters)
  const app = createMockApp();
  app.use(router);

  beforeEach(async ()=>{
    adapters.clear();
    updateState(await adapters.pushMocks());
  });

  it("Should create a new group when a user is authenticated", async () => { 
    const token = await adapters.tokenizerAdapter.tokenize(state.user);
    const tokenString = `Bearer ${token}`;
    const headers = {
      'Authorization': tokenString,
      Accept: 'application/json',
    };
    const groupDraft = {
      title: 'My test group'
    };
    
    const response = await request(app)
      .post('/')
      .set(headers)
      .send(groupDraft);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      group: {
        ...groupDraft,
        admin: state.user.id,
      },
    });
  });

  it("Should return an error when user is not authenticated", async () =>{
    const headers = {
      Accept: 'application/json',
    };
    const groupDraft = {
      title: 'My test group'
    };
    
    const response = await request(app)
      .post('/')
      .set(headers)
      .send(groupDraft);

    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({
      status: 'unauthenticated',
      message: expect.any(String),
    });
  });

  it("Should block forged tokens", async () => {
    const tokenizerAdapter = new SystemTokenizerAdapter('my false secret');
    const token = await tokenizerAdapter.tokenize(state.user);
    const tokenString = `Bearer ${token}`;
    const headers = {
      'Authorization': tokenString,
      Accept: 'application/json',
    };
    const groupDraft = {
      title: 'My test group'
    };
    
    const response = await request(app)
      .post('/')
      .set(headers)
      .send(groupDraft);

    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({
      status: 'unauthenticated',
      message: expect.any(String),
    });
  });

  it("Should list all groups from a user", async () => {
    const token = await adapters.tokenizerAdapter.tokenize(state.user);
    const tokenString = `Bearer ${token}`;
    const headers = {
      'Authorization': tokenString,
      Accept: 'application/json',
    };
    
    const response = await request(app)
      .get('/')
      .set(headers)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.groups).toBeArray();
    expect(response.body.groups.length).toBe(1);
    expect(response.body).toMatchObject({
      status: 'ok',
      groups: expect.any(Array),
    });
  });
});
