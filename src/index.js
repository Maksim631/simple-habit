import fastify from 'fastify'
import config from './config.js'
import jwt from 'jsonwebtoken'

import usersRoutes from './routes/users.router.js'
import authRoutes from './routes/auth.router.js'
import habitsRoutes from './routes/habits.router.js'

import codes from './utils/status-codes.js'

const app = fastify({ logger: true })

app.decorate('authenticate', async function (request, reply, done) {
  try {
    await jwt.verify(request.headers.authorization, process.env.JWT_KEY)
    done()
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      reply.status(codes.UNAUTHORIZED).send()
    } else {
      reply.status(codes.INTERNAL_SERVER_ERROR).send()
    }
  }
})

app.register(usersRoutes, { prefix: '/api/v1/users' })
app.register(authRoutes, { prefix: '/api/v1/auth' })
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
