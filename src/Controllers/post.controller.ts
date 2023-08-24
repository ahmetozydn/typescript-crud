import { PostService } from '../Services/post.service'
import { Request, Response } from 'express'
import { PostschemaValidate } from '../Models/posts'
import { injectable, inject } from 'inversify'
import { TYPES } from "../DI/types" // used in inversify
import { IResult } from '../Interfaces/IResult'
import { resourceLimits } from 'worker_threads'




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
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
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

    //pagination
    getPaginated = async (req: Request, res: Response) => {
        const limit = 5; 
        const answer: IResult | string = await this.service.getChunk(req.query.pi, limit);

        const isString = typeof answer;

        if (isString === 'string') { // if an error message is returned
            return res.status(400).json({ message: answer })
        }
        return res.status(200).json(answer)
    }
}

export { PostController } 