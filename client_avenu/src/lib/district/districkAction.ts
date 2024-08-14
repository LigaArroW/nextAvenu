'use server'

import { IFaq } from "@/types/faq/faq"
import { revalidateTag } from "next/cache"


export async function getDistricts() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/districts',
        {
            next: { tags: ['districts'] }
        }
    )
    return await response.json()

}

export async function addDistrict({ district, district_eng }: { district: string; district_eng: string }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/addDistrict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                district, district_eng
            }
        }),

    })
    revalidateTag('districts')
    return await response.json()

}

export async function updateDistrict({ id, district, district_eng }: { id: number, district: string; district_eng: string }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/updateDistrict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id, district, district_eng
            }
        }),

    })
    revalidateTag('districts')
    return await response.json()

}

export async function deleteDistrict({ id }: { id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/deleteDistrict', {
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
    revalidateTag('districts')
    return await response.json()

}
