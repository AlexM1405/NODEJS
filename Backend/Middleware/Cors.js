import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:4888',
  'http://localhost:5173',
  'https://Utravel.com',
  'https://midu.dev'
]

  
 export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})