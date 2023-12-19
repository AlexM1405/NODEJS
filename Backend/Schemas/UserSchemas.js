import { z } from 'zod'

const UserSchema = z.object({
    username: z.string(),
    email: z.string().email(), 
    password: z.string(),
 });

export function validateUser(input) {
    return UserSchema.safeParse(input)
}

export function validateParcialUser(input) {
    return UserSchema.partial().safeParse(input)
}