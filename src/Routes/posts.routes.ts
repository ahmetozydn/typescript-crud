//importing modules
import express from "express";
import { PostController } from '../Controllers/post.controller'
import { diContainer } from "../DI/iversify.config";
import { TYPES } from "../DI/types";

//initiating the router, express is a framework like springboot in java
export const router = express.Router()
// holds the registered dependencies and manages their creation and resolution
const controller = diContainer.get<PostController>(TYPES.controller);

// sub-routes after /api/posts
router.get('/pagination', controller.getPaginated)
router.post('/',controller.addpost) // the same URL can have multiple HTTP methods
router.get('/', controller.getPosts)
router.get('/:id', controller.getAPost) // query parametres uses ?=id 
router.put('/:id', controller.updatePost)
router.delete('/:id', controller.deletePost)
