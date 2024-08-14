'use server'


import { revalidateTag } from "next/cache"


export async function getCountries() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/countries',
        {
            next: { tags: ['countries'] }
        }
    )
    return await response.json()

}

