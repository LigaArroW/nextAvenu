'use server'

import { IFaq } from "@/types/faq/faq"
import { revalidateTag } from "next/cache"


export async function getFaqs() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/faqs',
        {
            next: { tags: ['Faqs'] }
        }
    )
    return await response.json()

}

export async function addFaq({ faq }: { faq: IFaq }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/add_faq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                faq: faq,
            }
        }),

    })
    revalidateTag('Faqs')
    return await response.json()

}

export async function updateFaq({ faq }: { faq: IFaq }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/update_faq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                faq: faq,
            }
        }),

    })
    revalidateTag('Faqs')
    return await response.json()

}

export async function deleteFaq({ id }: { id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/delete_faq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id
            }
        }),

    })
    revalidateTag('Faqs')
    return await response.json()

}
