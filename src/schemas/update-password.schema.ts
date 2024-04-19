import { z } from 'zod'

const updatePasswordSchema = z.object({
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

export default updatePasswordSchema;