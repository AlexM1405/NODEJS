import { TourModel } from "../Models/Local-file-System/TourModel.js";
import { validateTours, validateParcialTours } from "../Schemas/TourSchemas.js"

export class ToursControllers {
    static async getAll (req, res) {
        const { location } =req.query
        const Tours = await TourModel.getAll({location})
        return res.json(Tours)
     }
     static async getById (req, res) {
        const { id } =req.params
        const Tour = await TourModel.getById({id})
        if (Tour) return res.json(Tour)
        res.status(404).json({message:"Tours not found"})
        
    }
    static async create (req, res) {
        const result = validateTours(req.body)
        if (!result.success){
            return res.status(400).json({ error: result.error.message })
        }
        
        const newTours = await TourModel.create({input:result.data})
        res.status(201).json(newTours)
    }
    static async delete (req, res)  {
        const { id } = req.params
        
        const result = await TourModel.delete({id})
    
        if (result === false) {
          return res.status(404).json({ message: 'Tours not found' })
        }
        return res.json({ message: 'Tours deleted' })
      }
      static async update (req, res) {
        const result = validateParcialTours(req.body)
    
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
          }
        const {id} =req.params
        const updateTours = await TourModel.update({ id, input:result.data})
    
          return res.json(updateTours)
    }
}