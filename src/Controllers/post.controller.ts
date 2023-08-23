import { PostService } from '../Services/post.service'
import { Request, Response } from 'express'
import { PostschemaValidate } from '../Models/posts'
import { injectable, inject } from 'inversify'
import { TYPES } from "../DI/types" // used in inversify

@injectable() // that is called as decorator-annotation
class PostController {
    private service: PostService; // there is no private modifier in JS 

    constructor(@inject(TYPES.service) service: PostService) { // constructor injection
        this.service = service
    }

    //get all posts
    getPosts = async (req: Request, res: Response) => { // non-blocking approach
        const posts = await this.service.getPosts()
        res.send(posts)
    }

    //get a single post
    getAPost = async (req: Request, res: Response) => { // when the async task is finished fires a callback function
        const id = req.params.id // extract id from the link
        const post = await this.service.getPost(id)
        res.send(post)
    }

    //add post controller
    addpost = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published
        }
        //validating the request
        const { error, value } = PostschemaValidate.validate(data)

        if (error) {
            res.send(error.message)
        } else {
            //call the create post function in the service and pass the data from the request
            const post = await this.service.createPost(value)
            res.status(201).send(post) // status is set to ok
        }
    }

    //update post
    updatePost = async (req: Request, res: Response) => {
        const id = req.params.id
        const post = await this.service.updatePost(id, req.body)
        res.send(post)
    }

    //delete a post
    deletePost = async (req: Request, res: Response) => {
        const id = req.params.id
        await this.service.deletePost(id)
        res.send('post deleted')
    }
}

export { PostController } 