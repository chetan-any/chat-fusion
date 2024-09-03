"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Avatar } from "@nextui-org/avatar";
import { acceptFriendRequest } from "@actions/acceptFriendRequest";
import { denyFriendRequest } from "@actions/denyFriendRequest";

interface FriendRequestsProps {
  incomingFriendRequests: User[];
}

export default function FriendRequests({
  incomingFriendRequests,
}: FriendRequestsProps) {
  const [friendRequests, setFriendRequests] = useState<User[]>(
    incomingFriendRequests,
  );

  const handleAcceptFriendRequest = async (id: string, name: string) => {
    const status = await acceptFriendRequest(id, name);
    toast.success(status);
  };

  const handleDenyFriendRequest = async (id: string, name: string) => {
    const status = await denyFriendRequest(id, name);
    toast.success(status);
  };

  return (
    <>
      {incomingFriendRequests.length === 0 ? (
        <p className={`text-2xl font-semibold text-rose-500`}>
          No incoming friend requests
        </p>
      ) : (
        <ul className={`space-y-8`}>
          {friendRequests.map((request) => {
            return (
              <li
                key={request.id}
                className={`flex items-center justify-between gap-x-6`}
              >
                <div className={`flex items-center gap-x-2`}>
                  <Avatar
                    src={request.image}
                    showFallback
                    // name={request.name}
                    color={`primary`}
                    size={`lg`}
                    className={`select-none`}
                  />

                  <div className={``}>
                    <p className={``}>{request.name}</p>
                    <p className={`text-xs text-zinc-400`}>{request.email}</p>
                  </div>
                </div>

                {/* Buttons for Accept & deny friend requests */}
                <div className={`flex items-center gap-x-3`}>
                  <Tooltip
                    color={`success`}
                    size={`sm`}
                    content={`Accept ${request.name}`}
                    offset={1}
                    placement={`top`}
                    showArrow
                    shadow={`lg`}
                  >
                    <Button
                      aria-label={`accept-friend`}
                      variant={`flat`}
                      isIconOnly
                      color={`success`}
                      radius={`full`}
                      onPress={() =>
                        handleAcceptFriendRequest(request.id, request.name)
                      }
                    >
                      <FaCheck
                        size={22}
                        className={`size-7 cursor-pointer rounded-full bg-green-400 p-1 text-green-950`}
                      />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    color={`danger`}
                    size={`sm`}
                    content={`Deny ${request.name}`}
                    offset={1}
                    placement={`top`}
                    shadow={`lg`}
                    showArrow
                  >
                    <Button
                      aria-label={`deny-friend`}
                      variant={`flat`}
                      isIconOnly
                      color={`danger`}
                      radius={`full`}
                      onPress={() =>
                        handleDenyFriendRequest(request.id, request.name)
                      }
                    >
                      <ImCross
                        size={17}
                        className={`size-7 cursor-pointer rounded-full bg-red-500 p-[6px] text-slate-200`}
                      />
                    </Button>
                  </Tooltip>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
