'use server'


import { revalidatePath } from "next/cache";
import { registerSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { getLocale, getTranslations } from "next-intl/server";
import { ZodError } from "zod";
import { setAuthAction } from "@/lib/auth/authAction";
import { verify } from "jsonwebtoken";
import { RolesUsersToTokenRoles } from "@/lib/auth/authType";
import { generateToken } from "@/lib/token/tokenAction";
import ContactUsEmail from "@/shared/components/Emails/ContactUsEmail";
import { render } from "@react-email/components";
import RegisterEmail from "@/shared/components/Emails/RegisterEmail";
import { ProfileType } from "@/enums/profileType";


type User = {
    _id: string
    roles: keyof typeof RolesUsersToTokenRoles
    models: number[]
}

interface IToken {
    token: string
    success: boolean
}

export async function registerAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const login = data.get('login');
        const password = data.get('password');
        const type = data.get('type');

        const messages = registerSchema.parse({
            login,
            password,
            type
        })
        const token: IToken = await generateToken({ login: messages.login })
        if (token.success === false) {
            throw new Error("Error on generate token")
        }

        const register = await postFormData({ login: messages.login, password: messages.password, token: token.token, type: messages.type })
        if(register.success === false) {
            return {
                success: false,
                message: register.message
            }
        }
        // await postFormData(messages)
        // revalidatePath('login')
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

interface IconfirmAction {
    success: boolean
    message: string
}

export async function registerConfirmAction({ login, token }: { login: string; token: string }): Promise<IconfirmAction> {

    const res = await fetch('http://localhost:8001/api/confirm_profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    login: login,
                    token: token
                }
            }
        )
    })
    const data: IconfirmAction = await res.json();
    return data

}


const postFormData = async ({ login, password, token, type }: { login: string; password: string, token: string, type: string, }) => {
    const t = await getTranslations();
    const locale = await getLocale();
    const res = await fetch('http://localhost:8001/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    login: login,
                    password: password,
                    type: type,
                    html: render(
                        RegisterEmail({
                            login: login,
                            password: password,
                            token: token,
                            emailTitle: t("emails.registration_on_the_site"),
                            emailLogin: t("global.login"),
                            emailPassword: t("global.password"),
                            emailDescription: t("emails.you_have_reistered"),
                            emailButtonText: t("global.complete_registration"),
                            emailComplete: t("emails.to_complete_registration"),
                            locale
                        })
                    ),
                    email_login: process.env.VITE_EMAIL_USER!,
                    email_password: process.env.VITE_EMAIL_PASS!,
                    emailSubject: t("emails.registration_on_the_site"),
                }
            }
        )
    })
    const data = await res.json();

    return data


}

