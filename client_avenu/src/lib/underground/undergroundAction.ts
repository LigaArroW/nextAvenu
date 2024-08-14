'use server'

import { revalidateTag } from "next/cache"


export async function getUndergrounds() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/undergrounds',
        {
            next: { tags: ['underground'] }
        }
    )
    return await response.json()

}

export async function addUnderground({ underground, underground_eng }: { underground: string; underground_eng: string }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/addUnderground', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                underground, underground_eng
            }
        }),

    })
    revalidateTag('underground')
    return await response.json()

}

export async function updateUnderground({ id, underground, underground_eng }: { id: number, underground: string; underground_eng: string }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/updateUnderground', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id, underground, underground_eng
            }
        }),

    })
    revalidateTag('underground')
    return await response.json()

}

export async function deleteUnderground({ id }: { id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/deleteUnderground', {
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
    revalidateTag('underground')
    return await response.json()

}
