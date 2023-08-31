import { Router} from 'express'
import { login } from '../Controllers/ControllersAuth'

export const AuthRouter = Router()

AuthRouter.post('/login',[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

],login)
