import jwt from 'jsonwebtoken'

import * as refreshDAO from '../db/refresh-tokens.dao.js'
import * as usersDAO from '../db/users.dao.js'

import codes from '../utils/status-codes.js'

export async function remove(request, reply) {
  const { userId } = request.params
  const token = request.headers.authorization
  const { id: tokenUserId } = jwt.decode(token)
  if (tokenUserId === userId) {
    await refreshDAO.removeUser(userId)
    await usersDAO.remove(userId)
    reply.code(codes.OK).send()
  } else {
    reply.code(codes.FORBIDDEN).send()
  }
}

export async function update(request, reply) {
  const { userId } = request.params
  const newValues = request.body
  const token = request.headers.authorization
  const { id: tokenUserId } = jwt.decode(token)
  if (tokenUserId === userId) {
    await usersDAO.update(newValues)
    reply.code(codes.OK).send()
  } else {
    reply.code(codes.FORBIDDEN).send()
  }
}
