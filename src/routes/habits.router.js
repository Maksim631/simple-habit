export default function (fastify, opts, done) {
  fastify.post('/habits', 'HANDLER')
  fastify.delete('/habits/:habitId', 'HANDLER')
  fastify.put('/habits', 'HANDLER')
  done()
}
