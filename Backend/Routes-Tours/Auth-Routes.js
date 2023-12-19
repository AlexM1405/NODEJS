import { Router } from "express";
import { AuthControllers } from "../Controllers/ControllersAuth.js";


export const createAuthRouter = ({userModel}) => {
    const AuthRouter = Router()
  
   const authController = new AuthControllers({ userModel })
    
    
    AuthRouter.post("/SignUp", (authController.SignUp)),
    AuthRouter.post("/login", (authController.login))

   return AuthRouter


}