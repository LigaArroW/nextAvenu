'use server'


import { revalidateTag } from "next/cache"


export async function getCities() {
    const response = await fetch('http://localhost:8001/api/cities',
        {
            next: { tags: ['cities'] }
        }
    )
    return await response.json()

}

