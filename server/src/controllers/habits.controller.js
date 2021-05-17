import jwt from 'jsonwebtoken'

import * as habitDAO from '../db/habits.dao.js'

import codes from '../utils/status-codes.js'

export async function create(request, reply) {
  const habit = request.body
  const result = await habitDAO.add(habit)
  if (result) {
    reply.code(codes.OK).send()
  } else {
    reply.code(codes.INTERNAL_SERVER_ERROR).send()
  }
}

export async function remove(request, reply) {
  const { habitId } = request.params
  const result = await habitDAO.remove(habitId)
  if (result) {
    reply.code(codes.OK).send()
  } else {
    reply.code(codes.INTERNAL_SERVER_ERROR).send()
  }
}

export async function update(request, reply) {
  const habit = request.body
  const result = await habitDAO.update(habit)
  if (result) {
    reply.code(codes.OK).send()
  } else {
    reply.code(codes.INTERNAL_SERVER_ERROR).send()
  }
}

export async function getUserHabits(request, reply) {
  const token = request.headers.authorization
  const { id: tokenUserId } = jwt.decode(token)
  const result = await habitDAO.getUserHabits(tokenUserId)
  reply.code(codes.OK).send(result)
}
