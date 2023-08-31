import { User } from "../Models/Local-file-System/UserModel";
import bcrypt from "bcryptjs";
import { generarJWT } from "../Helpers/generatorJWT";

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userDB = await User.findOne({ where: { email } })
    console.log(userDB)
    if (userDB) {
      const validPassword = bcrypt.compareSync(password, usuarioDB.password)

      if (!validPassword) {
        res.status(401).json({
          ok: false,
          msg: "Pasword incorrect",
        })
      } else {
       const token = await generarJWT(userDB.id, userDB.nombre)
        res.json({
          ok: true,
          token,
        })
      }
    } else {
      res.status(404).json({
        ok: false,
        msg: "No existe usuario para ese mail",
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      msg: "Error al buscar usuario",
    })
  }
}