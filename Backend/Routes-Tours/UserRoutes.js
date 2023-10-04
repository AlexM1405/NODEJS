import { Router } from 'express'
import { UserControllers } from '../Controllers/ControllersUser.js'
import { validarJWT } from '../Middleware/jsonwebtoken.js'
import { UserModel } from '../Models/Local-file-System/UserModel.js'

export const createUserRouter = ({UserRouter}) => {
    const UsersRouter = Router()

    const userControllers = new UserControllers({UserModel : UserModel})

UsersRouter.post("/:id", (userControllers.create))

UserRouter.get(`/:id ${validarJWT}`, (userControllers.getbyID))
UserRouter.delete('/:id',(userControllers.delete))
UserRouter.patch("/:id", (userControllers.update))

return UsersRouter
}