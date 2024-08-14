'use server'

import { IBlacklist } from "@/types/profile/blacklist/blacklist"
import { IBlacklistAccess } from "@/types/profile/blacklist/blacklistAccess"
import { revalidatePath, revalidateTag } from "next/cache"


export async function getBlacklist({ agency_id }: { agency_id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/blacklist?agency_id=${agency_id}`,
        {
            method: 'GET',
            next: { tags: ['blacklist'] }
        }
    )
    return await response.json()

}

export async function addBlacklist({ blacklist }: { blacklist: IBlacklist }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/add_blacklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                agency_id: blacklist.agency_id,
                country_id: blacklist.country_id,
                city_id: blacklist.city_id,
                phone_number: blacklist.phone_number,
                description: blacklist.description,
            }
        }),

    })
    revalidateTag('blacklist')
    return await response.json()

}
export async function deleteBlacklist({ id, agency_id }: { id: number, agency_id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/delete_blacklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id: id,
                agency_id: agency_id
            }
        }),

    })


    revalidateTag('blacklist')
    return await response.json()

}
export async function getBlacklistAccess({ agency_id }: { agency_id: number }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/blacklist_access?agency_id=${agency_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },


    })
    revalidateTag('blacklistAccess')
    return await response.json()

}

export async function addBlacklistAccess({ agency_id, access_to }: { agency_id: number, access_to: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/add_blacklist_access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                agency_id,
                access_to,
            }
        }),

    })
    revalidateTag('blacklistAccess')
    return await response.json()

}
export async function deleteBlacklistAccess({ id, agency_id }: { id: number, agency_id: number }) {

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/add_blacklist_access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id: id,
                agency_id: agency_id
            }
        }),

    })
    revalidateTag('blacklistAccess')
    return await response.json()

}
