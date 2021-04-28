import fastify from 'fastify'

import config from './config.js'

import usersRoutes from './routes/users.router.js'
import habitsRoutes from './routes/habits.router.js'

const app = fastify({ logger: true })

app.register(usersRoutes, { prefix: '/api/v1/users' })
app.register(habitsRoutes, { prefix: '/api/v1/habits' })

const start = async () => {
  try {
    await app.listen(config.port)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()