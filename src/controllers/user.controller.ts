import {Request, Response, NextFunction} from 'express'
import {omit} from 'lodash'
import {CreateUser} from '../services/user.service'
import {createUserInput} from '../schema/user.schema'
import {logger} from '../utils/logger'
export const createUserHandler = async(req: Request<{}, {}, createUserInput['body']>, res: Response, next: NextFunction) => {
       try {
           const user = await CreateUser(req.body)
           return res.send(omit(user.toJSON(), "password"))
       } catch (error: any) {
           logger.error(error)
           return res.status(409).json({ ok : false, msg: error.message})
       }
}