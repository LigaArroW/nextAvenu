'use server'

import { addAccessBlackListSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { getLocale, getTranslations } from "next-intl/server";
import { ZodError } from "zod";
import { RolesUsersToTokenRoles } from "@/lib/auth/authType";
import { render } from "@react-email/components";
import { generateLoginMailToken } from "@/lib/token/tokenAction";
import LoginEmail from "@/shared/components/Emails/LoginEmail";
import { addBlacklistAccess, getBlacklistAccess } from "@/lib/blackList/blackList";
import { getAgencies } from "@/lib/users/usersAction";
import { IProfile } from "@/types/profile/profile/profile";
import { IBlacklistAccess } from "@/types/profile/blacklist/blacklistAccess";


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


export async function addAccessBlackListAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const access_to = Number(data.get('access_to'));
        const id = Number(data.get('id'));

        const messages = addAccessBlackListSchema.parse({
            access_to,
            id
        })

        const agencies = await getAgencies()
        const accessToBlackList = await getBlacklistAccess({ agency_id: messages.id })

        if (
            agencies.filter((agency: IProfile) => agency.id === messages.access_to).length > 0 &&
            messages.access_to !== messages.id &&
            accessToBlackList.filter(
                (access: IBlacklistAccess) => access.agency_id === messages.id && access.access_to === messages.access_to
            ).length === 0
        ) {
            const postData = await addBlacklistAccess({ access_to: messages.access_to, agency_id: messages.id })
            if (!postData.success) {
                return {
                    success: false,
                    message: postData.message
                }
            }


            return {
                success: true,
                message: t('global.success_email_send')
            }
        } else {

            return {
                success: false,
                message: t('profile.invalid_agency_id')
            }
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







