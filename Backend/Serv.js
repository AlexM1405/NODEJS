import express, { json } from 'express';
import 'dotenv/config'
import { corsMiddleware } from "./Middleware/Cors.js";
import { connect } from './Models/DataBase/MongoDb.js';
import cookieParser from 'cookie-parser';

import { createTourRouter } from "./Routes-Tours/Tour-Routes.js";
import { createAuthRouter } from './Routes-Tours/Auth-Routes.js';
import { createBookingRouter } from './Routes-Tours/Booking-Routes.js';
import { createUserRouter } from './Routes-Tours/User-Routers.js';

import { TourModel } from './Models/Local-file-System/TourModel.js';
import { UserModel } from './Models/Local-file-System/UserModel.js';
import { BookingModel } from './Models/Local-file-System/BookingModel.js';


const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable("x-powered-by")
  app.use(cookieParser());


  app.use("/Tours", createTourRouter({tourModel:TourModel}))
  app.use("/User", createUserRouter({userModel: UserModel}))
  app.use("/Auth", createAuthRouter({userModel: UserModel}))
  app.use("/Booking", createBookingRouter({ bookingModel: BookingModel}))


 const PORT = process.env.PORT ?? 4888

 app.listen(PORT, ()=>{
    connect();
    console.log(`Server is running on port http://localhost:${PORT}`)
  })

