import { PORT } from './constants'
import { server } from './server'

const app = server()

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${PORT}`)
  })
