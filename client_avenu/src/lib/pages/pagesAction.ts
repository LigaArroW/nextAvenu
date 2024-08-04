'use server'

import { IFaq } from "@/types/faq/faq"
import { IPage } from "@/types/page/page"
import { revalidateTag } from "next/cache"


export async function getPages() {
    const response = await fetch('http://localhost:8001/api/pages',
        {
            next: { tags: ['pages'] }
        }
    )
    return await response.json()

}


export async function updatePage({ page }: { page: IPage }) {

    const response = await fetch('http://localhost:8001/api/update_faq', {
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
    revalidateTag('pages')
    return await response.json()

}

