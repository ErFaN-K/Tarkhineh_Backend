import db from '@/database/database.config'

export const checkDbConnection = async (): Promise<void> => {
  try {
    await db.authenticate()
    await db.sync({ alter: true })

    console.log('Database Connected Successfully')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Database Connection Failed', error.message)
    } else {
      console.log('An unknown error occurred while connecting to the database')
    }
  }
}
