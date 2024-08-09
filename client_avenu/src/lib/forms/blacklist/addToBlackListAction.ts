'use server'

import { IMessage } from "@/types/message/message";
import { addToBlackListSchema, contactUsSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { render } from "@react-email/components";
import ContactUsEmail from "@/shared/components/Emails/ContactUsEmail";
import { getTranslations } from "next-intl/server";
import { ZodError } from "zod";
import { IBlacklist } from "@/types/profile/blacklist/blacklist";

export async function addToBlackListAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    console.log('🚀 ~ addToBlackListAction ~ data:', data);

    const t = await getTranslations();
    try {
        const id = Number(data.get('id'));
        const city = Number(data.get('city'));
        const country = Number(data.get('country'));
        const description = data.get('description');
        const phone = data.get('phone');
        const agency_id = Number(data.get('agency_id'));




        const messages = addToBlackListSchema.parse({
            id,
            city,
            country,
            description,
            phone,
            agency_id
        })
        console.log("🚀 ~ addToBlackListAction ~ messages:", messages)

        const res = await postFormData({ blacklist: { id: messages.id, agency_id: messages.agency_id, country_id: messages.country, city_id: messages.city, phone_number: messages.phone, description: messages.description } })
        console.log("🚀 ~ addToBlackListAction ~ res:", res)

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
        return {
            success: false,
            message: t('server.mistake_try_again')
        }
    }


}

const postFormData = async ({ blacklist }: { blacklist: IBlacklist }) => {
    const t = await getTranslations();

    const res = await fetch('http://localhost:8001/api/add_blacklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    agency_id: blacklist.agency_id,
                    country_id: blacklist.country_id,
                    city_id: blacklist.city_id,
                    phone_number: blacklist.phone_number,
                    description: blacklist.description,
                }
            }
        )
    })
    if (!res.ok) {

        throw new Error('Failed to send message');
    }

    return res.json();


}

