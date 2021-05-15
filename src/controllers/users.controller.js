import jwt from 'jsonwebtoken'
import * as refreshDAO from '../db/refresh-tokens.dao.js'
import * as usersDAO from '../db/users.dao.js'

export async function remove(request, reply) {
  const { userId } = request.params
  const token = request.headers.authorization
  const { id: tokenUserId } = jwt.decode(token)
  if (tokenUserId === userId) {
    await refreshDAO.removeUser(userId)
    await usersDAO.remove(userId)
    reply.code(200).send()
  } else {
    reply.code(403).send()
  }
}

export async function update(request, reply) {
  const { userId } = request.params
  const newValues = request.body
  const token = request.headers.authorization
  const { id: tokenUserId } = jwt.decode(token)
  if (tokenUserId === userId) {
    await usersDAO.update(newValues)
    reply.code(200).send()
  } else {
    reply.code(403).send()
  }
}
