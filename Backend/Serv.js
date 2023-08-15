const express = require ("express")
const crypto = require ("node:crypto")
const cors = require('cors')

const travelPackages = require("./travelPackages.json")
const { validatetravelPackages, validatePartialtravelPackages } = require("./Schemas/Schemas")



const app = express()
app.use(express.json())
app.disable("x-powered-by")
app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:4888',
        'http://localhost:5135',
        'https://UTRAVEL.com',
        'https://midu.dev'
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  }))


app.get("/", (req,res) =>{
    res.json({message:"Hello World"})
})


app.get("/travelPackages", (req,res) =>{
    res.end(JSON.stringify(travelPackages))
})

app.get("/travelPackages/:key/:location", (req,res) =>{
    const { location } =req.query
    const filteredtravelPackages =travelPackages.filter(travelPackages => travelPackages.location === location)
    return res.json(filteredtravelPackages)

    res.status(404).json({message:"travelPackages not found"})
})


app.post("/travelPackages", (req, res) => {
    const result = validatetravelPackages(req.body)

    if (result.error) {
        return res.status(400).json({ error: result.error.message })
    }
    
    const newtravelPackages ={
    id:crypto.randomUUID(),
    ...result.data
    }

    res.status(201).json(newtravelPackages)
})

app.delete('/travelPackages/.key', (req, res) => {
    const { key } = req.params
    const travelPackagesIndex = travelPackages.findIndex(travelPackages => travelPackages.key === key)
  
    if (travelPackages === -1) {
      return res.status(404).json({ message: 'Travel Packages not found' })
    }
  
    travelPackages.splice(travelPackagesIndex, 1)
  
    return res.json({ message: 'Travel Packages deleted' })
  })

app.patch("/travelPackages/:key", (req, res) => {
    const result = validateParcialtravelPackages(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
    const {key} =req.params
    const travelPackagesIndex = travelPackages.findIndex(travelPackages => travelPackages.key === key)

    if (travelPackagesIndex === -1)
    return res.status(404).json({message:"Travel Packages Not Found"})

    const updatetravelPackages = {
        ...travelPackages[travelPackagesIndex],
        ...result.data
      }
    
      travelPackages[travelPackagesIndex] = updatetravelPackages
      return res.json(updatetravelPackages)
})

const PORT = process.env.PORT ?? 4888

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})

