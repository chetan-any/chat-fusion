'use server'

import db from "@lib/db";
import { auth } from "@lib/auth";
import { emailSchema } from "@utils/form/types";
import { ZodError } from "zod";
import { redirect } from "next/navigation";


/**Adds incoming friend requests to the redis database at `user:${currentUserID}:incoming_friend_requests` */
export const addIncomingFriendRequests = async (clientFormEmail: string) => {
    const session = await auth()

    const { email } = emailSchema.parse({ email: clientFormEmail })

    try {
        const isEmailExistsInRedisDB = await db.exists(`user:email:${email}`)

        // This will never be true if you've set the middleware correctly.
        if (!session) {
            redirect(`/login`)
        }

        else {
            // To check if the you're sending friend request does exists in the Redis DB or not? and if exists, then send the request.
            const id = await db.get(`user:email:${email}`)

            if (isEmailExistsInRedisDB) {
                const isAlreadyAdded = await db.sismember(`user:${id}:incoming_friend_requests`, session?.user?.id)

                const isAlreadyFriend = await db.sismember(`user:${session.user?.id}:friends`, id)

                // To check if you're sending a request to yourself or not?
                if (email === session?.user?.email) {
                    throw new Error(`You can not add yourself ❌`)
                }

                // To check if user already added or not?
                else if (isAlreadyAdded) {
                    throw new Error(`User already added.`)

                }

                // To check if user already added or not?
                else if (isAlreadyFriend) {
                    throw new Error(`User already added.`)
                }

                else {
                    await db.sadd(`user:${id}:incoming_friend_requests`, session.user?.id)
                    return `Friend request sent.`;
                }
            }

            else {
                throw new Error(`No user found. Please use another ID.`)
            }
        }

    } catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
            // return new Error(error.message);
            return error.message;
        }
        else {
            // return new Error(`Something went wrong!`)
            return `Something went wrong!`
        }
    }
}
