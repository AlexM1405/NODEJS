import { validateBooking } from "../Schemas/BookingSchemas.js";

export class BookingControllers {
   constructor ({bookingModel}) {
       this.bookingModel = bookingModel
    }
  
   createBooking = async (req, res,) => {
       const result = validateBooking(req.body)
       if (!result.success){
           return res.status(400).json({ error: 'Missing required fields', details: result })
         }
       const Bookings = await this.bookingModel.create({ input:result.data });
       res.status(201).json(Bookings)
   }
 
   getBooking = async (req, res) => {
    const id = req.params.id;
    const Bookings = await this.bookingModel.getById(id);
    if (Bookings) {
      return res.json(Bookings);
    } else {
      return res.status(404).json({ message: "Booking not found" });
    }
  };
 
   deleteBooking = async(req, res,) => {
       const { id } = req.params
       const result = await this.bookingModel.delete({id});
       if (result === false) {
           return res.status(404).json({ message: 'Booking not found' })
         }
        return res.json({ message: 'Booking deleted' })
   }
 }