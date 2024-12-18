import fastify from 'fastify';
import { describe, test, beforeAll, afterAll, expect } from '@jest/globals';

const app = fastify();

beforeAll(async () => {
  app.get('/', async () => {
    return 'Hello, world!';
  });

  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('Server tests', () => {
  test('GET / should return 200', async () => {
    
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toContain('Hello, world!');
  });
});
