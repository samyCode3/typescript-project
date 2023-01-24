import {DocumentDefinition} from 'mongoose'
import  {userModel, UserDocument } from '../models/user.model'
import {omit} from 'lodash'
export const CreateUser = async (input : DocumentDefinition<Omit < UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
  try {
      const user =  await userModel.create(input)
      return omit(user.toJSON(), 'password')
  } catch (error: any) {
      throw new Error(error)
  }
}

export const validateUserPassword = async ({email, password }: {email : string, password:  string}) => {
  const user = await userModel.findOne({ email })
  if(!user) {
    return false
  }
  const isValid =  await user.comparePassword(password)
  if(!isValid) return false; 
  return omit(user.toJSON(), 'password')
}