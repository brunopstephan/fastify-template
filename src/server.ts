import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import {fastifySwagger} from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import "dotenv";

const port = Number(process.env.PORT) || 3333

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {origin: '*'})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Fastify Template',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ]
    }
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.listen({
    port
}).then(() => {
    console.log(`Server is running on port ${port}`);
})