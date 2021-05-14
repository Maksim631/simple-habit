import mongodb from 'mongodb'

import { getConnection } from './index.js'

let client
getConnection().then((connection) => {
  client = connection.collection('users')
})

export async function insert(user) {
  try {
    await client.insertOne(user)
    return true
  } catch (e) {
    return false
  }
}

export async function update(user) {
  try {
    await client.update({ _id: new mongodb.ObjectID(user._id) }, user)
    return true
  } catch (e) {
    return false
  }
}

export async function find(email) {
  try {
    const user = await client.findOne({
      email,
    })
    return user
  } catch (error) {
    return false
  }
}

export async function remove(userId) {
  try {
    await client.deleteOne({
      _id: new mongodb.ObjectID(userId),
    })
    return true
  } catch (err) {
    return false
  }
}
