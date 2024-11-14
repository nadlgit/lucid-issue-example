import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test('Fake test, just to show the issue', async () => {
  const user = await User.create({
    fullName: 'John Doe',
    email: `john${Date.now()}@doe.com`,
    password: 'secret',
  })
  await User.accessTokens.create(user)

  const queryClient = db.connection()

  // Trying to truncate the tables
  try {
    for (const tableName of await queryClient.getAllTables(['myschema'])) {
      await queryClient.truncate(tableName)
    }
  } catch (error) {
    console.log(error)
  }

  // Trying to drop the tables
  try {
    await queryClient.dropAllTables(['myschema'])
  } catch (error) {
    console.log(error)
  }
}).timeout(30000)
