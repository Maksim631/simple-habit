import mongodb from 'mongodb'
import config from '../config.js'

const { MongoClient } = mongodb

let client

async function connectToDb() {
  client = (
    await MongoClient.connect(config.mongodb, {
      useNewUrlParser: true,
    })
  ).db('simple-habit')
}

export async function getConnection() {
  if (!client) {
    await connectToDb()
  }
  return client
}

export async function closeConnection() {
  await client.close()
}
