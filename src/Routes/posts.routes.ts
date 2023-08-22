//importing modules
import express from "express";
import { postController } from '../Controllers/post.controller'
import { myContainer } from "../iversify.config";
import { TYPES } from "../types";

//initiating the router, express is a framework like springboot in java
export const router = express.Router()
// holds the registered dependencies and manages their creation and resolution
const controller = myContainer.get<postController>(TYPES.controller);


// routing after /api/posts
router.post('/',controller.addpost) // the same URL can have multiple HTTP methods
router.get('/', controller.getPosts)
router.get('/:id', controller.getAPost) // query parametres uses ?=id 
router.put('/:id', controller.updatePost)
router.delete('/:id', controller.deletePost)