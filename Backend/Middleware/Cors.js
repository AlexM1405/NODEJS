import cors from 'cors'

export const CorsMiddleware = () => cors ({
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

 })
