'use server'


import { IPage } from "@/types/page/page"
import { getLocale } from "next-intl/server"
import { revalidateTag } from "next/cache"


export async function getPages() {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/pages',
        {
            next: { tags: ['allPages'],revalidate: 5 },

        }
    )
    return await response.json()

}


export async function updatePage({ page }: { page: IPage }) {
    const locale = await getLocale()
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/update_page', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                page: page,
            }
        }),

    })


    revalidateTag('allPages')
    return await response.json()

}

