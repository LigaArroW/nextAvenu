'use server'


import { revalidateTag } from "next/cache"


export async function getCities() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/cities',
        {
            next: { tags: ['cities'] }
        }
    )
    return await response.json()

}

