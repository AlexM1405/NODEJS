
import { UserModel } from '../Models/Local-file-System/UserModel.js'
import { validateUser , validateParcialUser} from "../Schemas/UserSchemas.js"

export class UserControllers {
  constructor ({UserModel}) {
    this.userModel = UserModel
  }
   getbyID = async (req, res) => {
        const {id} =req.params
        const User= await this.UserModel.getbyID({id})
       if (User) return res(User)
        res.status(404).json({message:"User not found"})
     }
   create = async (req, res) => {
        const result =validateUser(req.body)
        if (!result.success){
            return res.status(400).json({ error: result.error.message })
     }
     const newUser = await UserModel.create({input:result.data})
        res.status(201).json(newUser)
     }
   delete = async (req, res) => {
      const { id } = req.params
      
      const result = await UserModel.delete({id})
  
      if (result === false) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.json({ message: 'User deleted' })
    }
    update = async (req,res ) =>  {
      const result = validateParcialUser(req.body)
    
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
          }
        const {id} =req.params
        const updateUsers = await UserModel.update({ id, input:result.data})
    
          return res.json(updateUsers)

     }
}


