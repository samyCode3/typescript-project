import Mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface SchemaDocument extends Mongoose.Document {
    user : UserDocument['_id'],
    valid : boolean,
    userAgent: String,
    createdAt : Date,
    updatedAt : Date,
}
const SessionSchema = new Mongoose.Schema({
     user : {type : Mongoose.Schema.Types.ObjectId, ref : 'User'},
     valid : {type : Boolean, default: true},
     userAgent : {type : String}
    },
     { timestamps : true}
    )
 

export const sessionModel = Mongoose.model('session', SessionSchema)