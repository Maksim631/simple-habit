import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import * as usersDAO from '../db/users.dao.js'
import * as refreshDAO from '../db/refresh-tokens.dao.js'

async function issueTokenPair(userId) {
  const newRefreshToken = uuidv4()
  await refreshDAO.add(newRefreshToken, userId)
  return {
    token: jwt.sign({ id: userId }, process.env.JWT_KEY),
    refreshToken: newRefreshToken,
  }
}

export async function registerUser(request, reply) {
  const user = request.body
  const isAlreadyExist = await usersDAO.find(user.name)
  if (!!isAlreadyExist) {
    reply.code(403).send()
  } else {
    if (user.password === user.confirmedPassword) {
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(user.password, salt)
      await usersDAO.insert({
        name: user.name,
        email: user.email,
        password,
      })
      reply.status(200).send()
    } else {
      reply.code(409).send()
    }
  }
}

export async function login(request, reply) {
  const user = request.body
  const dbUser = await usersDAO.find(user.email)
  if (!dbUser) {
    reply.code(403).send()
  } else {
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      dbUser.password,
    )
    if (isPasswordCorrect) {
      const response = await issueTokenPair(dbUser._id)
      reply.code(200).send(response)
    } else {
      reply.code(403).send()
    }
  }
}

export async function refresh(request, reply) {
  const { refreshToken } = request.body
  const dbToken = refreshDAO.find(refreshToken)
  if (!dbToken) {
    reply.code(403).send()
  } else {
    await refreshDAO.remove(refreshToken)
    const response = await issueTokenPair(dbToken.userId)
    reply.code(200).send(response)
  }
}

export async function logout(request, reply) {
  const { userId } = request.body
  await refreshDAO.remove(userId)
  reply.code(200).send()
}

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
