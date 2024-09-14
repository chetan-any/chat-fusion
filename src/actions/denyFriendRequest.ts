'use server'

import db from "@lib/db"
import { auth } from "@lib/auth"
import { redirect } from "next/navigation"
import { ZodError } from "zod"
import { idSchema } from "@utils/validations/chatValidations"

export const denyFriendRequest = async (senderID: string, senderName: string) => {
    const { id } = idSchema.parse({ id: senderID })

    const session = await auth()

    try {
        if (!session) {
            redirect(`/login`)
        }
        else {
            await db.srem(`user:${session.user?.id}:incoming_friend_requests`, id)
            return `${senderName} successfully removed from your incoming friend requests`
        }
    }
    catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
            return error.message
        }
        return `Something went wrong.`
    }
}
