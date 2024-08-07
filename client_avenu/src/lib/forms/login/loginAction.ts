'use server'


import { revalidatePath } from "next/cache";
import { loginSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { getTranslations } from "next-intl/server";
import { ZodError } from "zod";
import { setAuthAction } from "@/lib/auth/authAction";
import { verify } from "jsonwebtoken";
import { RolesUsers, RolesUsersToTokenRoles } from "@/lib/auth/authType";


type User = {
    _id: string
    roles: keyof typeof RolesUsersToTokenRoles
    models: number[]
    balance: number
    is_confirmed: boolean
}

interface IResponse {
    message: string
    success: boolean
    token?: string
}

export async function loginAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const login = data.get('login');
        const password = data.get('password');


        const messages = loginSchema.parse({
            login,
            password,

        })

        await postFormData(messages)
        revalidatePath('login')
        revalidatePath('/')
        return {
            success: true,
            message: t('global.success_message_send')
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.issues[0].message
            }
        }

        if (error instanceof Error) {
            return {
                success: false,
                message: error.message
            }
        }

        return {
            success: false,
            message: t('server.mistake_try_again')
        }
    }


}

export async function Login({ login, password, email = false }: { login: string; password: string, email?: boolean }) {

    try {
        const res = await fetch('http://localhost:8001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    params: {
                        login: login,
                        password: password,
                        email: email,
                    }
                }
            )
        })
        // console.log("🚀 ~ Login ~ res:", res);

        // console.log("🚀 ~ Login ~ login:", login)

        const data: IResponse = await res.json();
    
       
        // console.log("🚀 ~ Login ~ data:", data)
        if (!data.token) {
            throw new Error('Invalid token');
        }
        
        const verif = verify(data.token, process.env.JWT_TOKEN_SECRET!) as User
        await setAuthAction(RolesUsersToTokenRoles[verif.roles], data.token)

        return data
    } catch (error) {

        console.log("🚀 ~ Login ~ error:", error)
        return {
            success: false,
            message: 'Invalid token'
        }
    }




}

const postFormData = async ({ login, password, email = false }: { login: string; password: string, email?: boolean }) => {
    const t = await getTranslations();

    const res = await fetch('http://localhost:8001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    login: login,
                    password: password,
                    email: email,
                }
            }
        )
    })
    const data: IResponse = await res.json();
    if (!data.token) {
        throw new Error(t('global.invalid_username'));
    }


    const verif = verify(data.token, process.env.JWT_TOKEN_SECRET!) as User


    setAuthAction(RolesUsersToTokenRoles[verif.roles], data.token)

    return data


}

