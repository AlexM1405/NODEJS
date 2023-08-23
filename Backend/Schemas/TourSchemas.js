import z from 'zod'

    const ToursSchema = z.object({
        id: z.number().int(),
        src : z.string().url().endsWith(".jpg"),
        text:  z.string(),
        label:   z.string(),
        price:      z.number().int().positive(),
        location: z.string(),
    })


export function validateTours(input) {
    return ToursSchema.safeParse(input)
}

export function validateParcialTours(input) {
    return ToursSchema.partial().safeParse(input)
}

