import dotenv from 'dotenv';
import express from 'express'
import { db} from '../Config/db.config'
import { router } from '../Routes/posts.routes'
import "reflect-metadata";
dotenv.config();

const app = express()
dotenv.config() 
const port =  process.env.PORT || 7070

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//redirect to sub-routes 
app.use('/api/posts', router)


//db connection then server connection
db.then(() => {
    app.listen(7070, () => console.log('Server listens for the request on port ${port}'))})