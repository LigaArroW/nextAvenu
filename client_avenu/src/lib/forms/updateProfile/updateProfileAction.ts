'use server'



import { updateProfileSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { getTranslations } from "next-intl/server";
import { ZodError } from "zod";


import { updateProfile } from "@/lib/users/usersAction";
import { IProfile } from "@/types/profile/profile/profile";
import { Login } from "../login/loginAction";





export async function updateProfileAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const password = data.get('password');
        const newPassword = data.get('newPassword');
        const email = data.get('email');
        const idString = data.get('id');

        const id = Number(idString);


        const messages = updateProfileSchema.parse({
            password,
            newPassword,
            email,
            id
        })


        const login = await Login({ login: messages.email, password: messages.password })

        if (!login.success) {
            return {
                success: false,
                message: 'profile.incorrect_current_password'
            }
        }

        const change = await updateProfile({
            profile: {
                password: messages.newPassword,
                id: messages.id,
                login: messages.email
            } as IProfile
        })



        if (!change.success) {
            return {
                success: false,
                message: "profile.incorrect_current_password"
            }
        }


        return {
            success: true,
            message: t('global.data_successfully_updated')
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




