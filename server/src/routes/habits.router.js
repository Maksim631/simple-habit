import * as habitsController from '../controllers/habits.controller.js'

export default function (fastify, opts, done) {
  fastify.post(
    '/',
    {
      preValidation: [fastify.authenticate],
    },
    habitsController.create,
  )
  fastify.put(
    '/',
    {
      preValidation: [fastify.authenticate],
    },
    habitsController.update,
  )
  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate],
    },
    habitsController.getUserHabits,
  )
  fastify.delete(
    '/:habitId',
    {
      preValidation: [fastify.authenticate],
    },
    habitsController.remove,
  )
  done()
}
