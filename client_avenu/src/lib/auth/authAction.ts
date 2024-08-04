'use server'

import { cookies } from "next/headers"
import { RolesUsers, TokensRoles } from "./authType"
import { verify } from "jsonwebtoken"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type Admin = {
    _id: string
    roles: keyof typeof RolesUsers
    type: number
}

export async function getAuthAction(tokenName: keyof typeof TokensRoles): Promise<Admin> {
    try {

        const cookie = cookies().get(tokenName)?.value
        if (!cookie) {
            throw new Error('Token not found in cookie');
        }

        const decode = verify(cookie!, process.env.JWT_TOKEN_SECRET!) as Admin

        return {
            _id: decode._id,
            roles: decode.roles,
            type: decode.type
        }

    } catch (error) {
        return {
            _id: '',
            roles: RolesUsers.None,
            type: -1
        }
    }



}



export async function setAuthAction(tokenName: keyof typeof TokensRoles, token: string) {
    cookies().set(tokenName, token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })
}


export async function removeAuthAction(tokenName: keyof typeof TokensRoles) {
    cookies().delete(tokenName)
    revalidatePath('admin-moderator')
    redirect('/')
}
