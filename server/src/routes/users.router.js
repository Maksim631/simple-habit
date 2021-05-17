import * as usersController from '../controllers/users.controller.js'

export default function (fastify, opts, done) {
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
