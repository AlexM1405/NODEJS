import jwt from 'jsonwebtoken';

export const generarJWT = (id, name) => { 

    return new Promise((resolve, reject) => {

        const payload = {id, name}

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        },(err, token) => {
            if (err) {
                console.log(err)
                reject('I cant generate the JWT Token')
            } else {
                resolve(token)
            }
        })

    })

}