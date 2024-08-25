import FriendRequests from "@components/ui/FriendRequests";
import MainContainer from "@components/MainContainer";
import { auth } from "@lib/auth";
import db from "@lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Friend Requests`,
};

export default async function Requests() {
  const session = await auth();

  const incomingSenderIDs = await db.smembers(
    `user:${session?.user?.id}:incoming_friend_requests`,
  );

  const senders = await Promise.all(
    incomingSenderIDs.map(async (senderID) => {
      const sender = (await db.get(`user:${senderID}`)) as User;
      return sender;
    }),
  );

  console.log(senders);

  return (
    <MainContainer className={`space-y-8`}>
      <h1 className={`text-3xl font-extrabold`}>Friend Requests</h1>

      <FriendRequests incomingFriendRequests={senders} />
    </MainContainer>
  );
}
