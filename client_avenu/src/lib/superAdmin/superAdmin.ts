'use server'

import { revalidateTag } from "next/cache"


export async function getProfilesAdmins() {
    const response = await fetch('http://localhost:8001/api/get_admins',
        {
            next: { tags: ['admins'] }
        }
    )
    return await response.json()

}

export async function changePasswordAdmin({ login, password }: { login: string; password: string }) {

    const response = await fetch('http://localhost:8001/api/update_admin_password', {
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
    revalidateTag('admins')
    return await response.json()

}