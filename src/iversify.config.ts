import { Container } from "inversify";
import { TYPES } from "./types";
import { PostService } from "./Services/post.service";
import { Post } from "./Models/posts";
import { postController } from "./Controllers/post.controller";
import "reflect-metadata";


const myContainer = new Container();
myContainer.bind<PostService>(TYPES.service).to(PostService);
myContainer.bind<postController>(TYPES.controller).to(postController);  

export { myContainer };