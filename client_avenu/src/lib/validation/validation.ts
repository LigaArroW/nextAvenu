import { z } from "zod";




export const contactUsSchema = z.object({
    name: z.string().min(3, { message: "validation.name" }),
    email: z.string().email({ message: "validation.email" }),
    message: z.string().min(10, { message: "validation.message" }),
})


export const adminAuthSchema = z.object({
    login: z.string(),
    password: z.string().min(6, { message: "validation.password" }),
})

export const loginSchema = z.object({
    login: z.string().email({ message: "validation.email" }),
    password: z.string().min(6, { message: "validation.password" }),
})

export const registerSchema = z.object({
    login: z.string().email({ message: "validation.email" }),
    password: z.string().min(6, { message: "validation.password" }),
    type: z.string().min(1, { message: "validation.type" }),
})

export const emailSchema = z.object({
    email: z.string().email({ message: "validation.email" }),
})

export const changePasswordSchema = z.object({
    password: z.string().min(6, { message: "validation.password" }),
    repeatPassword: z.string().min(6, { message: "validation.password" }),
    token: z.string().min(1, { message: "validation.token" }),
    email: z.string().email({ message: "validation.email" }),
}).refine(data => data.password === data.repeatPassword, {
    message: "validation.repeat_password",
    path: ["repeatPassword"],
})


export const updateProfileSchema = z.object({
    password: z.string().min(6, { message: "validation.password" }),
    newPassword: z.string().min(6, { message: "validation.password" }),
    email: z.string().min(1, { message: "validation.email" }),
    id: z.number().min(1, { message: "validation.id" }),
}).refine(data => data.password !== data.newPassword, {
    message: "global.passwords_dont_match",
    path: ["newPassword"],
})

