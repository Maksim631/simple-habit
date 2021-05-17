import mongodb from 'mongodb'

import { getConnection } from './index.js'

let client
getConnection().then((connection) => {
  client = connection.collection('habits')
})

export async function add(habit) {
  try {
    await client.insert(habit)
    return true
  } catch (error) {
    return false
  }
}

export async function remove(habitId) {
  try {
    await client.deleteOne({ _id: new mongodb.ObjectID(habitId) })
    return true
  } catch (error) {
    return false
  }
}

export async function update(habit) {
  try {
    await client.update({ _id: new mongodb.ObjectID(habit.id) }, habit)
    return true
  } catch (error) {
    return false
  }
}

export async function getUserHabits(userId) {
  try {
    return client.find({ userId })
  } catch (error) {
    return []
  }
}
