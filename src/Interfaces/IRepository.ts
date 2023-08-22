import { IPost } from './IPost'
// handles db connections, transactions, sessions
import { Document, Types } from 'mongoose'
import { returnType, getPostsReturnType } from '../types'

/* type returnType = 
  | (Document<unknown, any, IPost> & IPost & { _id: Types.ObjectId; })
  | "post not available"
  | undefined; */

export interface IRepository {
    getPosts(): getPostsReturnType
    getPost(id: string): returnType
    createPost(data: any): returnType
    updatePost(id: String, data: any): returnType
    deletePost(id: String): void
}