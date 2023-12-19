import { z } from 'zod';

const TourSchema = z.object({
 src: z.string(),
 text: z.string(),
 label: z.string(),
 description: z.string(),
 price: z.number().int().positive(),
 location: z.string(),
});

export function validateTours(input) {
 return TourSchema.safeParse(input)
}
export function validateParcialTours(input) {
    return TourSchema.partial().safeParse(input)
}

