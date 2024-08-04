'use server'

import { revalidateTag } from "next/cache"


export async function getProfilesUsers() {
    const response = await fetch('http://localhost:8001/api/get_profiles',
        {
            next: { tags: ['users'] }
        }
    )
    return await response.json()

}

export async function changePasswordUsers({ login, password }: { login: string; password: string }) {

    const response = await fetch('http://localhost:8001/api/update_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            params: {
                login: login,
                password: password,
            }
        }),

    })
    revalidateTag('users')
    return await response.json()

}