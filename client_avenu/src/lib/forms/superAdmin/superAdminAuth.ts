'use server'

import { getTranslations } from "next-intl/server";
import { IAdminAuthForm } from "../formTypes";
import { ZodError } from "zod";
import { adminAuthSchema } from "@/lib/validation/validation";
import { revalidatePath } from "next/cache";
import { setAuthAction } from "@/lib/auth/authAction";


export async function superAdminAuthAction(prevState: IAdminAuthForm, data: FormData): Promise<IAdminAuthForm> {
    const t = await getTranslations();

    try {

        const login = data.get('login');
        const password = data.get('password');
        const messages = adminAuthSchema.parse({
            login,
            password
        })

        await authAdmin(messages.login, messages.password)
        revalidatePath('admin-4c458ba3adfa8005a9df1c8fa74e28e0')
        return {
            success: true,
            message: t('global.authorization')
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.issues[0].message
            }
        }
        return {
            success: false,
            message: t('server.mistake_try_again')
        }
    }



}


const authAdmin = async (login: string, password: string) => {



    const res = await fetch('http://localhost:8001/api/admin-4c458ba3adfa8005a9df1c8fa74e28e0', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(
            {
                params: {
                    login: login,
                    password: password
                }
            }
        )
    })


    const data = await res.json();
    if (!data.token) {
        throw new Error('Invalid token');
    }

    setAuthAction('SuperAdminToken', data.token)

    return data


}
