import dotenv from 'dotenv';
import express from 'express'
import { db } from '../Config/db.config'
import { router } from '../Routes/posts.routes'
import { pageNotFound } from '../Controllers/error.controller'
import "reflect-metadata";
dotenv.config();

const app = express()
dotenv.config()
const port = process.env.PORT || 7070

//middlewares
app.use(express.json()) // apply globally
app.use(express.urlencoded({ extended: true }))

//redirect to sub-routes 
app.use('/api/posts', router)
 app.use('/', pageNotFound) 

//db connection then server connection
db.then(() => {
    app.listen(port, () => console.log(`Server listens on http://localhost:${port}/api/posts/`))
})