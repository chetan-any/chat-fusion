"use client";

import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import chatHrefConstructor from "@utils/chatHrefConstructor";
import { usePathname } from "next/navigation";
import cn from "@utils/cn";
import { useEffect, useState } from "react";
import { type TMessage } from "@validations/chatValidations";
import { Chip } from "@nextui-org/chip";

interface SidebarChatListProps {
  friends: User[];
  currentUserID: string;
}

export default function SidebarChatList({
  friends,
  currentUserID,
}: SidebarChatListProps) {
  const pathName = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<TMessage[]>([]);

  useEffect(() => {
    if (pathName.includes(`chat`)) {
      setUnseenMessages((prev) => {
        return prev.filter((message) => !pathName.includes(message.senderID));
      });
    }
  }, [pathName]);

  return (
    <ul role={`list`} className={`ml-1 space-y-3`}>
      {friends.map((friend) => {
        const activeChat = pathName.startsWith(
          `/dashboard/chat/${currentUserID}--${friend.id}`,
        );

        const totalUnseenMessages = unseenMessages.filter((unseenMessage) => {
          return unseenMessage.senderID === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <Link
              href={`/dashboard/chat/${chatHrefConstructor(currentUserID, friend.id)}`}
              title={`${friend.name} (${friend.email})`}
              className={cn(
                `bg-hover flex items-center justify-between border dark:border-slate-800`,
                activeChat && `rounded-md bg-cyan-200 p-2 dark:bg-cyan-900/50`,
              )}
            >
              <div className={`flex items-center gap-x-2`}>
                <Avatar
                  src={friend.image}
                  alt={friend.name}
                  size={`sm`}
                  showFallback
                  color={`primary`}
                />
                <span>{friend.name}</span>
              </div>

              {totalUnseenMessages > 0 && (
                <Chip color={`danger`} variant={`shadow`} size={`sm`}>
                  {totalUnseenMessages}
                </Chip>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
