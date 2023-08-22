//importing modules
import  {Schema, model} from 'mongoose'
import Joi from 'joi'
import {IPost} from '../Interfaces/IPost'

//validation schema
export const PostschemaValidate = Joi.object({ 
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    published: Joi.boolean().required(),
})


//Postschema
const postSchema = new Schema<IPost>({
    title: {
        type: String,
    },

    description: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    
})

//creating a model
 export const Post = model<IPost>('Post', postSchema )
