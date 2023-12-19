import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()
mongoose.set("strictQuery", false)
export const connect = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI, {
    })
    console.log("MongoDb database connected")
    
  } catch (err) {
    console.log("Error connecting to the database: ", err.message);
  }
}

export class TourModel {
  static async getAll ({ location }) {
    const db = await connect()

    if (location) {
      return db.find({
        location: {
          $elemMatch: {
            $regex: genre,
            $options: 'i'
          }
        }
      }).toArray()
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async create ({ input }) {
    const db = await connect()

    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}