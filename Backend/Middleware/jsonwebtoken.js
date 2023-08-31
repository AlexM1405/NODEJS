import jwt from 'jsonwebtoken' ;

 export const validarJWT = (req, res, next) => { 

    const token = req.header('authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token"
        })
    }

    try {

         const {id} = jwt.verify(token, process.env.JWT_SECRET)

        req.id = id

        next()
    } catch(error) {
        console.log(error)
        return res.status(401).json({ 
            ok: false,
            msg: "Token Invalid"
        })
    }


}