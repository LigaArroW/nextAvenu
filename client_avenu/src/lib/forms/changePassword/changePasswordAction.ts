'use server'


import { revalidatePath } from "next/cache";
import { changePasswordSchema, emailSchema, loginSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { getLocale, getTranslations } from "next-intl/server";
import { ZodError } from "zod";
import { setAuthAction } from "@/lib/auth/authAction";
import { verify } from "jsonwebtoken";
import { RolesUsers, RolesUsersToTokenRoles } from "@/lib/auth/authType";
import { render } from "@react-email/components";
import { generateLoginMailToken } from "@/lib/token/tokenAction";
import LoginEmail from "@/shared/components/Emails/LoginEmail";


type User = {
    _id: string
    roles: keyof typeof RolesUsersToTokenRoles
    models: number[]
}

interface IResponse {
    message: string
    success: boolean
    token?: string
}

interface IPostEmail {
    success: boolean
    message: string
}


export async function ChangePasswordAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const password = data.get('password');
        const repeatPassword = data.get('repeatPassword');
        const token = data.get('token');
        const email = data.get('email');

        const messages = changePasswordSchema.parse({
            password,
            repeatPassword,
            email,
            token
        })

        const change = await postPassword({ login: messages.email, token: messages.token, password: messages.password });

        if (!change.success) {
            return {
                success: false,
                message: change.message
            }
        }


        return {
            success: true,
            message: t('global.success_email_send')
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


const postPassword = async ({ login, token, password }: { login: string, token: string, password: string }): Promise<IPostEmail> => {
    const t = await getTranslations();
    const locale = await getLocale();
    const res = await fetch('http://localhost:8001/api/change_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    login: login,
                    token: token,
                    password: password,
                }
            }
        )
    })
    const data = await res.json();

    return data
}




