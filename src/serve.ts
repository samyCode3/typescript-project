import express from 'express'
import  config  from 'config';
import {logger} from './utils/logger'
import {connect} from './utils/connect';
import {router} from './routes/routes'
const PORT = config.get<number>('port')
const app= express()
app.use(express.json())
const ExpressServer =  () => {

            app.listen(PORT, async () => {
                logger.info(`App server running on port http://localhost/${PORT}`)
                await connect()
                router(app)
            }) 
    }

ExpressServer()
export default app
