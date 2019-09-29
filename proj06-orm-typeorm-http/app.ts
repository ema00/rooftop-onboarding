import 'reflect-metadata'
import {createConnection} from 'typeorm'
import  app from './app-express'

async function initializeApp() {
    await createConnection()

    return app
}

export default initializeApp