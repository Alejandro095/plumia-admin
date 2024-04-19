import { z } from 'zod'

const signUpSchema = z.object({
    name: z.string().min(4, { message: "El nombre de usuario debe tener al menos 4 caracteres" }),
    email: z.string().email({ message: "El email no es válido"}),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    mallName: z.string().min(4, { message: "El nombre del centro comercial debe tener al menos 4 caracteres" }),
    mallCost: z.preprocess(x => x ? x : undefined, z.coerce.number().int({ message: "El costo por hora del centro comercial no es un numero válido" }).positive({ message: "El costo  del centro comercial debe ser un número positivo"})),
})

export default signUpSchema;