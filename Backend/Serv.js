import express, { json } from 'express';
import 'dotenv/config'
import { createTourRouter } from "./Routes-Tours/Tour-Routes.js";
import { corsMiddleware } from "./Middleware/Cors.js";
import { createUserRouter } from './Routes-Tours/UserRoutes.js';
import { AuthRouter } from './Routes-Tours/Auth.js';
import { TourModel } from './Models/Local-file-System/TourModel.js';
import { UserModel } from './Models/Local-file-System/UserModel.js';


export const createApp = ({ tourModel, userModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable("x-powered-by")

  app.use("/Tours", createTourRouter({tourModel}))
  app.use("/User",  createUserRouter({userModel}))
  app.use('/auth', AuthRouter)

  return app; // return the app instance
}

const PORT = process.env.PORT ?? 4888

// Call createApp and store the returned app instance
const app = createApp({tourModel: TourModel, userModel: UserModel});

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})

