'use server'

import { IMessage } from "@/types/message/message";
import { contactUsSchema } from "../../validation/validation";
import { IContactUsForm } from "../formTypes";
import { render } from "@react-email/components";
import ContactUsEmail from "@/shared/components/Emails/ContactUsEmail";
import { getTranslations } from "next-intl/server";
import { ZodError } from "zod";

export async function contactUsAction(prevState: IContactUsForm, data: FormData): Promise<IContactUsForm> {
    const t = await getTranslations();
    try {
        const name = data.get('name');
        const email = data.get('email');
        const message = data.get('message');

        const messages = contactUsSchema.parse({
            name,
            email,
            message
        })

        await postFormData(messages)

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

const postFormData = async (data: IMessage) => {
    const t = await getTranslations();

    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/add_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                params: {
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    html: render(
                        ContactUsEmail({
                            name: data.name,
                            email: data.email,
                            text: data.message,
                            emailTitle: t("emails.message_from_site"),
                            emailName: t("global.name"),
                            emailMessage: t("global.message"),
                        })
                    ),
                    emailSubject: t("emails.message_from_site"),
                    login: process.env.VITE_EMAIL_USER!,
                    password: process.env.VITE_EMAIL_PASS!,
                }
            }
        )
    })
    if (!res.ok) {

        throw new Error('Failed to send message');
    }

    return res.json();


}

