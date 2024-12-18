import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { PORT } from './constants'

export function server() {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  app.register(fastifyCors, { origin: '*' })

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Fastify Template',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Development server',
        },
      ],
    },
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  app.get('/health-check', async () => {
    return { message: 'ok' }
  })

  return app
}
