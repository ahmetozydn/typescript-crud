import { PostService } from '../Services/post.service'
import { PostschemaValidate } from '../Models/posts'
import { injectable, inject } from 'inversify'
import { TYPES, SORT_OPT } from "../DI/types" // used in inversify
import { IResult } from '../Interfaces/IResult'
import { resourceLimits } from 'worker_threads'
import { Express, Request, Response } from 'express';





@injectable() // that is called as decorator-annotation
class PostController {
    private service: PostService; // there is no private modifier in JS 

    constructor(@inject(TYPES.service) service: PostService) { // constructor injection
        this.service = service
    }

    //get all posts
    getPosts = async (req: Request, res: Response) => { // non-blocking approach
        const sortParam = req.query.sort;
        const isValid = this.isValidSortOption(sortParam)


        if (typeof sortParam === 'string' && isValid) {
            const answer = await this.service.sort(sortParam)

        }

        const posts = await this.service.getPosts();
        res.send(posts);
    }

    isValidSortOption(value: any): value is SORT_OPT {
        return Object.values(SORT_OPT).includes(value);
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
    getChunk = async (req: Request, res: Response) => {
        const limit = 5;

        const queryPool = {
            sortType: req.sortType,
            pageIndex: req.pageIndex,
            orderBy: req.orderBy
        }

        const answer: IResult | undefined = await this.service.getChunk(queryPool, limit);

        const isString = typeof answer;

        if (isString === 'string') { // if an error message is returned
            return res.status(400).json({ message: answer })
        }
        return res.status(200).json(answer)
    }
    //update post
    patchPost = async (req: Request, res: Response) => {
        const id = req.params.id
        const post = await this.service.patchUpdate(id, req.body)
        res.send(post)
    }
}

export { PostController } 