'use server'

import { getTranslations } from "next-intl/server";
import { IAdminAuthForm } from "../formTypes";
import { ZodError } from "zod";
import { adminAuthSchema } from "@/lib/validation/validation";
import { revalidatePath } from "next/cache";
import { setAuthAction } from "@/lib/auth/authAction";
import { verify } from "jsonwebtoken";
import { RolesUsersToTokenRoles } from "@/lib/auth/authType";


type Admin = {
    _id: string
    roles: keyof typeof RolesUsersToTokenRoles

}

export async function adminAuthAction(prevState: IAdminAuthForm, data: FormData): Promise<IAdminAuthForm> {
    const t = await getTranslations();

    try {

        const login = data.get('login');
        const password = data.get('password');
        const messages = adminAuthSchema.parse({
            login,
            password
        })

        await authAdmin(messages.login, messages.password)
        revalidatePath('admin-moderator')
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



    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/login_admin', {
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
    const verif = verify(data.token, process.env.JWT_TOKEN_SECRET!) as Admin
    setAuthAction(RolesUsersToTokenRoles[verif.roles], data.token)

    return data


}

