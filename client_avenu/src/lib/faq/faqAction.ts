'use server'

import { IFaq } from "@/types/faq/faq"
import { revalidateTag } from "next/cache"


export async function getFaqs() {
    const response = await fetch('http://localhost:8001/api/faqs',
        {
            next: { tags: ['Faqs'] }
        }
    )
    return await response.json()

}

export async function addFaq({ faq }: { faq: IFaq }) {

    const response = await fetch('http://localhost:8001/api/addFaq', {
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

    const response = await fetch('http://localhost:8001/api/update_faq', {
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

export async function deleteFaq({ faq }: { faq: IFaq }) {

    const response = await fetch('http://localhost:8001/api/delete_faq', {
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