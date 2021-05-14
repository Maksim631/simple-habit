import * as habitsController from '../controllers/habits.controller.js'

export default function (fastify, opts, done) {
  fastify.post('/habits', habitsController.stub)
  fastify.delete('/habits/:habitId', habitsController.stub)
  fastify.put('/habits', habitsController.stub)
  done()
}
