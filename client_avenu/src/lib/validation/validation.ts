import { z } from "zod";




export const contactUsSchema = z.object({
    name: z.string().min(3, { message: "validation.name" }),
    email: z.string().email({ message: "validation.email" }),
    message: z.string().min(10,{ message: "validation.message" }),
})


