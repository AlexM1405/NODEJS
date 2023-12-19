import { Router } from 'express'
import { UserControllers } from '../Controllers/ControllersUser.js'

 export const createUserRouter = ({userModel}) => {
    const UserRouter = Router()

   const userControllers = new UserControllers({userModel})

 UserRouter.post("/:id", (userControllers.create))
 UserRouter.get(`/:id `, (userControllers.getbyID))
 UserRouter.delete('/:id',(userControllers.delete))
 UserRouter.patch("/:id", (userControllers.update))

 return UserRouter
 }