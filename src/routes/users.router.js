import * as usersController from '../controllers/users.controller.js'

export default function (fastify, opts, done) {
  fastify.post('/register', usersController.registerUser)
  fastify.post('/login', usersController.login)
  fastify.post(
    '/refresh',
    {
      preValidation: [fastify.authenticate],
    },
    usersController.refresh,
  )
  fastify.post(
    '/logout',
    {
      preValidation: [fastify.authenticate],
    },
    usersController.logout,
  )
  fastify.delete(
    '/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    usersController.remove,
  )
  fastify.put(
    '/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    usersController.update,
  )
  done()
}
