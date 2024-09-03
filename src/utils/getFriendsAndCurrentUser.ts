import db from "@lib/db";
import { auth } from "@lib/auth";

export default async function getFriendsAndCurrentUser() {
    const session = await auth()
    const currentUser = session?.user

    const friendsIDs = await db.smembers(`user:${currentUser?.id}:friends`)

    const friends = await Promise.all(friendsIDs.map(async (friendsID) => await db.get(`user:${friendsID}`))) as User[]

    return { currentUser, friends }

}