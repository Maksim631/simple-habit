import jwt from 'jsonwebtoken'

import * as habitDAO from '../db/habits.dao.js'

export async function create(request, reply) {
  const habit = request.body
  const result = await habitDAO.add(habit)
  if (result) {
    reply.code(200).send()
  } else {
    reply.code(500).send()
  }
}

export async function remove(request, reply) {
  const { habitId } = request.params
  const result = await habitDAO.remove(habitId)
  if (result) {
    reply.code(200).send()
  } else {
    reply.code(500).send()
  }
}

export async function update(request, reply) {
  const habit = request.body
  const result = await habitDAO.update(habit)
  if (result) {
    reply.code(200).send()
  } else {
    reply.code(500).send()
  }
}

export async function getUserHabits(request, reply) {
  const token = request.headers.authorization
  const { id: tokenUserId } = jwt.decode(token)
  const result = await habitDAO.getUserHabits(tokenUserId)
  reply.code(200).send(result)
}
