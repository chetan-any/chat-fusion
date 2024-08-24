'use server'

import { signIn, signOut } from "@lib/auth"


export const socialLogin = async (formData: FormData) => {
    const provider = formData.get(`action`) as string

    await signIn(provider, { redirectTo: `/dashboard` })
}

export const logOut = async () => {
    await signOut({ redirectTo: "/login" })
}