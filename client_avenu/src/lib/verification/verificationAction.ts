'use server'

import { IProfile } from "@/types/profile/profile/profile";
import { revalidateTag } from "next/cache"




export async function getCaptcha({ data }: { data: any }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/create_captcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                agency_id: data.agency_id,
                model_id: data.model_id,
            }
        }),

    })
    return await response.json()

}
export async function verifyCaptcha({ data }: { data: any }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/verify_captcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                agency_id: data.agency_id,
                model_id: data.model_id,
                verification_key: data.verification_key
            }
        }),

    })
    return await response.json()

}
export async function getPositionsUp({ agency_id }: { agency_id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/get_positions_up', {
        method: 'POST',
        next: { revalidate: 5 },
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                agency_id,
            }
        }),

    })
    // revalidateTag('Models')
    return await response.json()

}
export async function verifyCaptchaGoogle({ token }: { token: string }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/verify_captcha_google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                token
            }
        }),

    })
    return await response.json()

}


