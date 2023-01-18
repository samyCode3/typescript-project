import { Express,Request,Response, NextFunction } from "express";
import {createUserHandler} from '../controllers/user.controller';
import  {validateResource} from '../middleware/validateResource';
import {createUserSchema} from '../schema/user.schema'
export const router = (app: Express) => {
      app.get('/healthCheck', (req: Request, res: Response, next:NextFunction) => {
            res.sendStatus(200)
            next()
      })

      // create user
      app.post('/user/create', validateResource(createUserSchema), createUserHandler)
}