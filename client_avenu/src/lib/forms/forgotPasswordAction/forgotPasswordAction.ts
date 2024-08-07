'use server'


import { emailSchema, loginSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { getLocale, getTranslations } from "next-intl/server";
import { ZodError } from "zod";
import { RolesUsersToTokenRoles } from "@/lib/auth/authType";
import { render } from "@react-email/components";
import { generateToken } from "@/lib/token/tokenAction";
import ForgotPasswordEmail from "@/shared/components/Emails/ForgotPasswordEmail";


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


export async function forgotPasswordAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const email = data.get('email');

        const messages = emailSchema.parse({
            email,
        })


        const genericToken = await generateToken({ login: messages.email });

        if (!genericToken.success || !genericToken.token) {
            return {
                success: false,
                message: genericToken.message
            }
        }
        const postEmail = await SendToEmail({ login: messages.email, token: genericToken.token });

        if (!postEmail.success) {
            return {
                success: false,
                message: postEmail.message
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


const SendToEmail = async ({ login, token }: { login: string, token: string }): Promise<IPostEmail> => {
    const t = await getTranslations();
    const locale = await getLocale();
   
    const res = await fetch('http://localhost:8001/api/restore_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    login: login,
                    html: render(
                        ForgotPasswordEmail({
                            login: login,
                            token: token,
                            title: t("global.password_recovery"),
                            description: t("emails.forgot_password_description"),
                            loginText: t("global.login"),
                            buttonText: t("global.recover_password"),
                            locale
                        })
                    ),
                    emailSubject: t("global.password_recovery"),
                    email_login: process.env.VITE_EMAIL_USER!,
                    email_password: process.env.VITE_EMAIL_PASS!,
                }
            }
        )
    })

    const data = await res.json();


    return data
}




