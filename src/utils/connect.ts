import mongoose from 'mongoose'
import config  from 'config'
import {logger} from './logger'
export const connect = async() => {
    const dbUri = config.get<string>('dbUri')
    try {
        await mongoose.connect(dbUri)
        logger.info("Database connected")
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
   
}
