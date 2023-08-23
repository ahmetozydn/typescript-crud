
import {  IPost } from '../Interfaces/IPost'
import { Document, Types } from 'mongoose' // handles db connections, transactions, sessions

export const TYPES = {
    service: Symbol.for("PostService"),
    controller: Symbol.for("postController"),
}

// not directly related with DI, custom type alias
type CommonType = Document<unknown, any, IPost> & IPost & {
    _id: Types.ObjectId;
  }
export type getPostsReturnType = Promise<CommonType[] | undefined>

export type  returnType = Promise<CommonType | string | undefined>