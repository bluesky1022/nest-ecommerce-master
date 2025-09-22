import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    role:{
        type:String,
        enum: ['admin', 'customer'],
        default:'customer'
    },
     address: [
        {
            street: String,
            city: String,
            country: String,
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

const model = mongoose.model('users', UserSchema);

export default model;