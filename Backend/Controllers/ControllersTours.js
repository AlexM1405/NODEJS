import { validateTours, validateParcialTours } from "../Schemas/TourSchemas.js"

export class ToursControllers {

     constructor ({tourModel}) {
      this.tourModel= tourModel
   }

      getAll = async (req, res,) => {
        
        const { location } =req.query
        const Tours = await this.tourModel.getAll({location})
        res.json(Tours)
     }
    
      getById = async (req, res) => {
        
        const { id } =req.params
        const Tour = await this.tourModel.getById({id})
        if (Tour) return res.json(Tour)
        res.status(404).json({message:"Tours not found"})
        
    }
     create = async (req, res) => {
        const result = validateTours(req.body)
      
        if (!result.success){
          return res.status(400).json({ error: 'Missing required fields', details: result  })
        }
        const newTours = await this.tourModel.create({ input:result.data })
        res.status(201).json(newTours)
    }
     delete = async (req, res) => {

        const { id } = req.params
        
        const result = await this.tourModel.delete({id})
    
        if (result === false) {
          return res.status(404).json({ message: 'Tours not found' })
        }
        return res.json({ message: 'Tours deleted' })
      }
      
       update = async (req, res) => {
        const result = validateParcialTours(req.body)
    
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
          }
        const {id} =req.params
        const updateTours = await this.tourModel.update({ id, input:result.data})
    
          return res.json(updateTours)
    }
}