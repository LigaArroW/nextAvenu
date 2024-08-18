'use server'

import { cookies } from "next/headers"
import { RolesUsers, RolesUsersToTokenRoles, TokensRoles } from "./authType"
import { verify } from "jsonwebtoken"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getLocale } from "next-intl/server"

type Admin = {
    _id: string
    roles: keyof typeof RolesUsers
    type: number
}

export type User = {
    _id: string
    roles: keyof typeof RolesUsersToTokenRoles
    models: number[]
}

export type Person = {
    _id: string
    roles: keyof typeof RolesUsersToTokenRoles
    models: number[]
    balance: number
    is_confirmed: boolean
    login: string
    token: string
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

export async function getAuthDataUserAction(): Promise<Person> {

    try {
        const cookieStore = cookies()
        const person = cookieStore.getAll().filter(cookie => cookie.name.includes('Token'))[0]

        const decode = verify(person.value, process.env.JWT_TOKEN_SECRET!) as Person
        return {
            _id: decode._id,
            roles: decode.roles,
            models: decode.models,
            balance: decode.balance,
            is_confirmed: decode.is_confirmed,
            login: decode.login,
            token: person.value


        }
    } catch (error) {
        return {
            _id: '',
            roles: RolesUsersToTokenRoles.None,
            models: [],
            balance: 0,
            is_confirmed: false,
            login: '',
            token: ''
        }
    }



}


export async function getAuthUserAction(tokenName: keyof typeof TokensRoles): Promise<Person> {

    try {
        const cookie = cookies().get(tokenName)?.value
        if (!cookie) {
            throw new Error('Token not found in cookie');
        }

        const decode = verify(cookie!, process.env.JWT_TOKEN_SECRET!) as Person

        return {
            _id: decode._id,
            roles: decode.roles,
            models: decode.models,
            balance: decode.balance,
            is_confirmed: decode.is_confirmed,
            login: decode.login,
            token: cookie
        }
    } catch (error) {
        return {
            _id: '',
            roles: RolesUsers.None,
            models: [],
            balance: 0,
            is_confirmed: false,
            login: '',
            token: ''
        }
    }


}


export async function setAuthAction(tokenName: RolesUsersToTokenRoles = RolesUsersToTokenRoles.Customer, token: string) {
    cookies().set(tokenName, token, {
        httpOnly: true,
        // sameSite: 'none',
        // secure: true,
        
    })
}


export async function removeAuthAction(tokenName: keyof typeof TokensRoles) {
    const locale = await getLocale()
    cookies().delete(tokenName)
    revalidatePath('admin-moderator')
    redirect(`/${locale}`)
}


export async function removeUserAuthAction(tokenName: keyof typeof TokensRoles) {
    const locale = await getLocale()
    cookies().delete(tokenName)
    revalidatePath(`/${locale}`)
    redirect(`/${locale}`)
}