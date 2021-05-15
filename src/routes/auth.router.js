import * as authController from '../controllers/auth.controller.js'

export default function (fastify, opts, done) {
  fastify.post('/register', authController.register)
  fastify.post('/login', authController.login)
  fastify.post('/refresh', authController.refresh)
  fastify.post(
    '/logout',
    {
      preValidation: [fastify.authenticate],
    },
    authController.logout,
  )
  done()
}
