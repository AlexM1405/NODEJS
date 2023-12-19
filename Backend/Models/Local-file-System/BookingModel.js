import { randomUUID } from "crypto"
import { readJSON } from "../../utils.js"

const Bookings= readJSON("./Booking.json")

export class BookingModel {

    static async getById ({id}) {
        const Booking = Bookings.find(Booking => Booking.id === id)
        return Booking
    }
    static async create  ({input}) {
        const newBooking ={
            id: randomUUID(),
            ...input
        }
        Bookings.push(newBooking)
        return newBooking
    }
    static async delete ({id}) {
        const BookingIndex = Bookings.findIndex(Booking => Booking.id === id)
        if (BookingIndex === -1) return false

        Bookings.splice(BookingIndex, 1)
        return true;
    }

}

