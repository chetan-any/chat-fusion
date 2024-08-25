'use server'

import db from "@lib/db"
import { auth } from "@lib/auth"
import { IDSchema } from "@utils/form/types"
import { redirect } from "next/navigation"
import { ZodError } from "zod"


export const acceptFriendRequest = async (senderID: string, senderName: string) => {
    const { id } = IDSchema.parse({ id: senderID })

    const session = await auth()

    try {
        if (!session) {
            redirect(`/login`)
        } else {
            const isAlreadyFriend = await db.sismember(id, `user:${session.user?.id}:friend_requests`)

            const hasIncomingFriendRequest = await db.sismember(`user:${session.user?.id}:incoming_friend_requests`, id)
            console.log(hasIncomingFriendRequest);

            if (isAlreadyFriend) {
                throw new Error(`This user is already your friend.`)
            }

            else if (!hasIncomingFriendRequest) {
                throw new Error(`You can not add any user if that user has not sent you a friend request.`)
            }

            await db.sadd(`user:${session.user?.id}:friend_requests`, id)
            await db.sadd(`user:${id}:friend_requests`, session.user?.id)

            // To remove the sender id from incoming_friend_requests set it it has been added to friend_requests set.
            await db.srem(`user:${session.user?.id}:incoming_friend_requests`, id)

            return `Sucessfully added ${senderName}`
        }
    } catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
            return error.message
        } return `Something went wrong!`
    }
}
