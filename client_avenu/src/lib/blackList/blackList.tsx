'use server'

import { IBlacklist } from "@/types/profile/blacklist/blacklist"
import { IBlacklistAccess } from "@/types/profile/blacklist/blacklistAccess"
import { revalidateTag } from "next/cache"


export async function getBlacklist({ agency_id }: { agency_id: number }) {
    const response = await fetch(`http://localhost:8001/api/blacklist?agency_id=${agency_id}`,
        {
            method: 'GET',
            next: { tags: ['blacklist'] }
        }
    )
    return await response.json()

}

export async function addBlacklist({ blacklist }: { blacklist: IBlacklist }) {

    const response = await fetch('http://localhost:8001/api/add_blacklist', {
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
export async function deleteBlacklist({ id }: { id: number }) {

    const response = await fetch('http://localhost:8001/api/delete_blacklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id: id,
            }
        }),

    })
    revalidateTag('blacklist')
    return await response.json()

}
export async function getBlacklistAccess({ agency_id }: { agency_id: number }) {

    const response = await fetch(`http://localhost:8001/api/blacklist_access?agency_id=${agency_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },


    })
    revalidateTag('blacklistAccess')
    return await response.json()

}

export async function addBlacklistAccess({ blacklistAccess }: { blacklistAccess: IBlacklistAccess }) {

    const response = await fetch('http://localhost:8001/api/add_blacklist_access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                agency_id: blacklistAccess.agency_id,
                access_to: blacklistAccess.access_to,
            }
        }),

    })
    revalidateTag('blacklistAccess')
    return await response.json()

}
export async function deleteBlacklistAccess({ id }: { id: number }) {

    const response = await fetch('http://localhost:8001/api/add_blacklist_access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                id: id,
            }
        }),

    })
    revalidateTag('blacklistAccess')
    return await response.json()

}
