//importing modules
import { Schema, model } from 'mongoose'
import Joi, { number } from 'joi'
import { IPost } from '../Interfaces/IPost'

//validation schema
export const PostschemaValidate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    likes: Joi.number().required().default(0).min(0).max(Infinity),
    published: Joi.boolean().required()
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
    likes: {
         type: Number,
        required: true,
        default: 0,
        min: 0,
        max: Infinity 
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: { type: Date, default: Date.now }
})

postSchema.index({ title: 'text', description: 'text', author: 'text' }); // for search operation



//creating a model
export const Post = model<IPost>('Post', postSchema)
Post.createIndexes();
