import { Router} from 'express'

import { UserControllers } from "../Controllers/ControllersUser.js"
import { validarJWT } from '../Middleware/jsonwebtoken.js'

export const UserRouter = Router()


UserRouter.post("/", (UserControllers.create))

UserRouter.get("/:id", (UserControllers.getbyID))
UserRouter.delete('/:id',(UserControllers.delete))
UserRouter.patch("/:id", (UserControllers.update))