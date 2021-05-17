import mongodb from 'mongodb'

import { getConnection } from './index.js'

let client
getConnection().then((connection) => {
  client = connection.collection('refresh-tokens')
})
export async function add(token, userId) {
  try {
    await client.insert({ token, userId })
    return true
  } catch (err) {
    return false
  }
}

export async function find(token) {
  try {
    return await client.findOne({ token })
  } catch (error) {
    return null
  }
}

export async function remove(token) {
  try {
    await client.deleteOne({ token })
    return true
  } catch (error) {
    return false
  }
}

export async function removeUser(userId) {
  try {
    await client.deleteMany({ userId: new mongodb.ObjectID(userId) })
    return true
  } catch (error) {
    return false
  }
}
