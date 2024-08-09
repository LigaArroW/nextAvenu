'use server'


import { revalidateTag } from "next/cache"


export async function getCountries() {
    const response = await fetch('http://localhost:8001/api/countries',
        {
            next: { tags: ['countries'] }
        }
    )
    return await response.json()

}

