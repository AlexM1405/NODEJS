import express, { json } from 'express';
import dotenv from 'dotenv';
import {  createTourRouter } from "./Routes-Tours/Tour-Routes.js";
import { corsMiddleware } from "./Middleware/Cors.js";
import { UserRouter } from './Routes-Tours/UserRoutes.js';
import { AuthRouter } from './Routes-Tours/Auth.js';

export const createApp =({tourModel}) => {
dotenv.config()
const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable("x-powered-by")

app.use("/Tours", createTourRouter({tourModel}))
app.use("/User", UserRouter)
app.use('/auth', AuthRouter)


const PORT = process.env.PORT ?? 4888

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
}


