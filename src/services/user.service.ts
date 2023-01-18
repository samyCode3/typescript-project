import {DocumentDefinition} from 'mongoose'
import  {userModel, UserDocument } from '../models/user.model'

export const CreateUser = async (input : DocumentDefinition<Omit < UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
  try {
      return await userModel.create(input)
  } catch (error: any) {
      throw new Error(error)
  }
}