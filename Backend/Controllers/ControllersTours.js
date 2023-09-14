// import { TourModel } from "../Models/Local-file-System/TourModel.js";
//import { TourModel } from "../Models/DataBase/MySql.js"
import { validateTours, validateParcialTours } from "../Schemas/TourSchemas.js"

export class ToursControllers {
      constructor ({TourModel}) {
        this.TourModel = TourModel
      }

      getAll = async (req, res) =>{
        const { location } =req.query
        const Tours = await this.TourModel.getAll({location})
        return res.json(Tours)
     }
      getById = async (req, res) => {
        const { id } =req.params
        const Tour = await this.TourModel.getById({id})
        if (Tour) return res.json(Tour)
        res.status(404).json({message:"Tours not found"})
        
    }
     create = async (req, res) => {
        const result = validateTours(req.body)
        if (!result.success){
            return res.status(400).json({ error: result.error.message })
        }
        
        const newTours = await this.TourModel.create({input:result.data})
        res.status(201).json(newTours)
    }
     delete = async (req, res) => {
        const { id } = req.params
        
        const result = await this.TourModel.delete({id})
    
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
        const updateTours = await this.TourModel.update({ id, input:result.data})
    
          return res.json(updateTours)
    }
}