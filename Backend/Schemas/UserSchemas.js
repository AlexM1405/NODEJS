import z from 'zod'

const UserSchema = z.object({
    name: z.string().not().isEmpty(),
    pasword:  z.string().not().isEmpty(),
    email: z.email().not().isEmpty(),
    id: z.number().int(),

    
})

export function validateUser(input) {
    return UserSchema.safeParse(input)
}

export function validateParcialUser(input) {
    return UserSchema.partial().safeParse(input)
}