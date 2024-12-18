import { FastifyInstance } from 'fastify'
import { describe, test, beforeAll, afterAll, expect } from '@jest/globals'

import { server } from './server'

describe('server health test', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = server()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('GET /health-check should return 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health-check',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'ok' })
  })
})
