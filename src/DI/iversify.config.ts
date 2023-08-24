import { Container } from "inversify";
import { TYPES } from "./types";
import { PostService } from "../Services/post.service";
import { PostController } from "../Controllers/post.controller";
import "reflect-metadata";

const diContainer = new Container();
diContainer.bind<PostService>(TYPES.service).to(PostService);
diContainer.bind<PostController>(TYPES.controller).to(PostController);  

export { diContainer };