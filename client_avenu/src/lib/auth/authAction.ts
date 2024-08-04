'use server'

import { cookies } from "next/headers"
import { RolesUsers, TokensRoles } from "./authType"
import { verify } from "jsonwebtoken"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type Admin = {
    // _id: string
    roles: keyof typeof RolesUsers
    type: number
}

export async function getAuthAction(tokenName: keyof typeof TokensRoles): Promise< Admin | false> {
    try {

        const cookie = cookies().get(tokenName)?.value
        const decode = verify(cookie!, process.env.JWT_TOKEN_SECRET!) as Admin

        return {
            roles: decode.roles,
            type: decode.type
        }

    } catch (error) {
        return false
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
