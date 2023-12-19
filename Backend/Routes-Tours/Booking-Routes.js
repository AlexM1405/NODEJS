import { Router } from "express";
import { BookingControllers } from "../Controllers/ControllersBooking.js";



export const createBookingRouter = ({bookingModel}) => {
    const BookingRouter = Router()
  
   const bookingController = new BookingControllers({ bookingModel })
    
    
    BookingRouter.post("/",  (bookingController.createBooking));
    BookingRouter.get("/:id",(bookingController.getBooking));
    BookingRouter.delete("/:id",  (bookingController.deleteBooking));



   return BookingRouter


}