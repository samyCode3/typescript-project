import {Request, Response, NextFunction} from 'express'
import { validateUserPassword } from '../services/user.service'
import config from 'config'
import { createSession } from '../services/session.service'
import { signJwt } from '../utils/jwt.utils'
export const createUserSessionHandler = async (req: Request, res: Response) => {
     //Validate the User's password
     const user = await validateUserPassword(req.body)
     if(!user) {
        return res.status(401).send("Invalid email or password")
     }
     // create session 
     const session = await createSession(user._id, req.get("user-agent")  || "")
     // create a access token
     const accessToken = signJwt( 
      {...user, session: session.user},
      { expiresIn : config.get('accessToken')}
     )

     const refreshToken = signJwt( 
      {...user, session: session.user},
      { expiresIn : config.get('accessToken')}
     )

     return res.send({ accessToken, refreshToken})
}