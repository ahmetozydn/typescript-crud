import { IRepository } from '../Interfaces/IRepository'
import { injectable } from 'inversify'
import { Post } from '../Models/posts'
import "reflect-metadata";
import { Pagination } from './pagination';

// business layer
@injectable() // decorator
class PostService implements IRepository {

    //get all posts
    async getPosts() { // asynchronous func.
        try {
            const posts = await Post.find({})
            return posts
        } catch (error) {
            console.log(error)
        }
    }

    //get a single post
    async getPost(id: string) {
        try {
            const post = await Post.findById({ _id: id })
            if (!post) {
                return 'post not available'
            }
            return post
        } catch (error) {
            console.log(error)
        }
    }
    //create a post
    async createPost(data: any) {
        try {
            const newPost = await Post.create(data)
            return newPost
        } catch (error) {
            console.log(error)
        }
    }

    //update a post
    async updatePost(id: string, data: any) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const posts = await Post.findByIdAndUpdate({ _id: id }, data, { new: true })
            if (!posts) {
                return "post not available"
            }
            return posts
        } catch (error) {
            console.log(error)
        }
    }

    //delete a post by using the find by id and delete 
    async deletePost(id: string) {
        try {
            const post = await Post.findByIdAndDelete(id)
            if (!post) {
                return 'post not available'
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getChunk(pageIndex: any, limit:number) {
        const pagination = new Pagination(pageIndex, limit); // pass page-index and limit

        const isParamValid = await pagination.isParamValid() // check if the page-index is defined or invalid

        if (isParamValid == "undefined") {
            return 'Undefined page number'
        } else if (isParamValid == "invalid") {
            return 'Invalid page number requested.'
        }
        const result = await pagination.getPage();
        return result
    }
}

export { PostService } 
