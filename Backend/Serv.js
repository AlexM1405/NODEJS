import express, { json } from 'express';
import 'dotenv/config';
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

// Include the readJSON function directly in Serv.js
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (path) => {
  if (typeof path !== 'string' || !path) {
    throw new TypeError('The "path" argument must be a non-empty string.');
  }
  return require(path);
};

// Use the readJSON function to read the service account key
const serviceAccount = readJSON("./serviceAccountKey.json");

import admin from 'firebase-admin';

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");
app.use(cookieParser());

app.use("/Tours", createTourRouter({tourModel:TourModel}));
app.use("/User", createUserRouter({userModel: UserModel}));
app.use("/Auth", createAuthRouter({userModel: UserModel}));
app.use("/Booking", createBookingRouter({ bookingModel: BookingModel}));

app.get("/", (req,res) => {
  const HtmlResponse = '<h1>The API is Working</h1>';
  res.send(HtmlResponse);
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const PORT = process.env.PORT ??  4888;

app.listen(PORT, ()=>{
  connect();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
