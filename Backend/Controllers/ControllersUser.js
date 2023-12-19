import { validateUser , validateParcialUser} from "../Schemas/UserSchemas.js"

 export class UserControllers {
   constructor ({userModel}) {
     this.userModel = userModel
   }
    getbyID = async (req, res, ) => {
         const {id} =req.params
         const User= await this.userModel.getbyID({id})
        if (User) return res(User)
         res.status(404).json({message:"User not found"})
      }
    create = async (req, res) => {
         const result = validateUser(req.body)
         if (!result.success){
             return res.status(400).json({ error: result.error.message })
      }
      const newUser = await userModel.create({input:result.data})
         res.status(201).json(newUser)
      }
    delete = async (req, res) => {
       const { id } = req.params
      
       const result = await userModel.delete({id})
  
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
         const updateUsers = await userModel.update({ id, input:result.data})
    
           return res.json(updateUsers)
      }
 }