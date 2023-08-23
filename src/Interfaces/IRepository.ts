import { returnType, getPostsReturnType } from '../DI/types'

export interface IRepository {
    getPosts(): getPostsReturnType
    getPost(id: string): returnType
    createPost(data: any): returnType
    updatePost(id: String, data: any): returnType
    deletePost(id: String): void
}