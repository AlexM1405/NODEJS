import { z } from 'zod';

const BookingSchema = z.object({
 userEmail: z.string(),
 TourName: z.string(),
 FullName: z.string(),
 guest: z.number(),
 Phone: z.number(),
 BookAt: z.string(),
 
});

export function validateBooking(input) {
 return BookingSchema.safeParse(input)
}
export function validateParcialBooking(input) {
    return BookingSchema.partial().safeParse(input)
}