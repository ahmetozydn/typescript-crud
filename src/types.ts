
import {  IPost } from './Interfaces/IPost'
// handles db connections, transactions, sessions
import { Document, Types } from 'mongoose' 
export const TYPES = {
    service: Symbol.for("PostService"),
    controller: Symbol.for("postController"),
}

// not directly related with DI, custom type alias
type CommonType = Document<unknown, any, IPost> & IPost & {
    _id: Types.ObjectId;
  }
export type getPostsReturnType = Promise<CommonType[] | undefined>

export type  returnType = Promise<CommonType | "post not available" | undefined>

/* Promise<(Document<unknown, any, IPost> & IPost & {
        _id: Types.ObjectId;
    })[] | undefined>

Promise<(Document<unknown, any, IPost> & IPost & {
        _id: Types.ObjectId;
    }) | "post not available" | undefined>; */