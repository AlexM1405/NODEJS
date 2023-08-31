
import { UserModel } from '../Models/Local-file-System/UserModel'
import { validateUser , validateParcialUser} from "../Schemas/UserSchemas.js"

export class UserControllers {
   static async getAll (req, res) {
      const { email } =req.query
      const User = await UserModel.getAll({email})
      return res.json(User)
   }
    static async getbyID (req, res) {
        const {id} =req.params
        const User= await UserModel.getbyID({id})
       if (User) return res(User)
        res.status(404).json({message:"User not found"})
     }
     static async create (req, res) {
        const result =validateUser(req.body)
        if (!result.success){
            return res.status(400).json({ error: result.error.message })
     }
     const newUser = await UserModel.create({input:result.data})
        res.status(201).json(newUser)
     }
     static async delete (req, res)  {
      const { id } = req.params
      
      const result = await UserModel.delete({id})
  
      if (result === false) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.json({ message: 'User deleted' })
    }
     static  async update (req,res ){
      const result = validateParcialUser(req.body)
    
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
          }
        const {id} =req.params
        const updateUsers = await UserModel.update({ id, input:result.data})
    
          return res.json(updateUsers)

     }
}


