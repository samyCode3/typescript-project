import Mongoose from 'mongoose'
import config from 'config'
import bcrypt from 'bcryptjs'

export interface UserDocument extends Mongoose.Document {
    name : string,
    email : string,
    password : string,
    createdAt : Date,
    updatedAt : Date,
    comparePassword(candidatePassword: string) : Promise<boolean>
}
const UserSchema = new Mongoose.Schema({
     name : {type : String, required : true},
     email : {type : String, required: true, unique: true},
     password : {type : String, required : true}
    },
     { timestamps : true}
    )
    UserSchema.pre("save", async function(next) {
        let user = this as UserDocument 
        if(!user.isModified('password')) {
            return next()
        }

        const salt = await bcrypt.genSalt(config.get<number>('genSaltFactory'))
        const hash = await bcrypt.hashSync(user.password, salt)
        user.password = hash
        return next()
    })
    UserSchema.methods.comparePassword = async function(candidatePassword:string): Promise<boolean> {
        let user = this as UserDocument
        return bcrypt.compare(candidatePassword, user.password).catch((e) => false )
    }


export const userModel = Mongoose.model<UserDocument>('User', UserSchema)