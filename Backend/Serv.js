import express, { json } from 'express'
import {  TourRouter } from "./Routes-Tours/Tour-Routes.js"
import { CorsMiddleware } from "./Middleware/Cors.js";
import { UserRouter } from './Routes-Tours/UserRoutes.js';
import { AuthRouter } from './Routes-Tours/Auth.js';

const app = express()
app.use(json())
app.use(CorsMiddleware())
app.disable("x-powered-by")

app.use("/Tours", TourRouter)
app.use("/User", UserRouter)
app.use('/auth', AuthRouter)


const PORT = process.env.PORT ?? 4888

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})

