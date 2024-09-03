'use server'

import db from "@lib/db"
import { auth } from "@lib/auth"
import { redirect } from "next/navigation"
import { type TMessage, messageSchema } from "@validations/chatValidations"
import { nanoid } from "nanoid"


export const sendMessage = async (textMessage: string, chatID: string) => {
    const session = await auth()

    if (!session?.user?.id) {
        redirect(`/login`)
    }

    const [currentUserID, friendID] = chatID.split(`--`)

    if (session.user.id !== currentUserID && session.user.id !== friendID) {
        return `You are unauthorized 😭`
    }

    const isFriend = await db.sismember(`user:${currentUserID}:friends`, friendID)
    if (!isFriend) {
        return `Not a friend`
    }

    const currentTime = Date.now()

    const message: TMessage = {
        id: nanoid(),
        senderID: session.user.id,
        text: textMessage,
        timeStamp: currentTime
    }

    const validatedMessage = messageSchema.parse(message)

    const redisMessageData = {
        score: currentTime,
        member: validatedMessage
    }

    // all valid, send the message
    await db.zadd(`chat:${chatID}:messages`, redisMessageData)

    const friendChatID = `${friendID}--${currentUserID}`
    await db.zadd(`chat:${friendChatID}:messages`, redisMessageData)

    return `Message sent!`
}