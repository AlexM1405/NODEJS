import z from 'zod'

const UserSchema = z.object({
    name: z.string(),
    pasword:  z.number(),
    email: z.string().email(),
    id: z.string(),

    
})

export function validateUser(input) {
    return UserSchema.safeParse(input)
}

export function validateParcialUser(input) {
    return UserSchema.partial().safeParse(input)
}