export default function (fastify, opts, done) {
  fastify.post('/register', 'HANDLER')
  fastify.post('/login', 'HANDLER')
  fastify.delete('/:userId', 'HANDLER')
  fastify.put('/:userId', 'HANDLER')
  done()
}
