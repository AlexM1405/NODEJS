import { Router} from 'express'

import { UserControllers } from "../Controllers/ControllersUser.js"

export const UserRouter = Router()

UserRouterRouter.get("/", (UserControllers.getAll))
UserRouterRouter.post("/", (UserControllers.create))

UserRouterRouter.get("/:id", (UserControllers.getbyID))
UserRouterRouter.delete('/:id',(UserControllers.delete))
UserRouterRouter.patch("/:id", (UserControllers.update))