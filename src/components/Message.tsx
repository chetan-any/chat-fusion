import cn from "@utils/cn";
import { format } from "date-fns";
import { type TMessage } from "@validations/chatValidations";
import { Avatar } from "@nextui-org/avatar";

interface MessageProps {
  message: TMessage;
  className?: string;
  user: User;
  friendData: User;
}

export default function Message({
  message,
  user,
  friendData,
  className,
}: MessageProps) {
  const isCurrentUser = message.senderID === user?.id;

  return (
    <div
      className={cn(`flex gap-x-2`, {
        "self-end": isCurrentUser,
        "flex-row-reverse self-start": !isCurrentUser,
      })}
    >
      <div
        className={cn(
          `flex w-fit max-w-80 select-none flex-col gap-x-3 text-balance break-words rounded-xl px-3 py-2 shadow-xl`,
          className,
          {
            "rounded-tr-none bg-blue-700 text-left": isCurrentUser,
            "rounded-tl-none bg-slate-600": !isCurrentUser,
          },
        )}
      >
        <div className={cn(`text-sm text-white`)}>{message.text}</div>
        <div
          className={cn(`self-end text-nowrap text-xs`, {
            "text-cyan-400": isCurrentUser,
            "text-slate-300": !isCurrentUser,
          })}
        >
          {format(message.timeStamp, "hh:mm a")}
        </div>
      </div>

      <Avatar
        size={`sm`}
        src={isCurrentUser ? user.image : friendData.image}
        alt={friendData.name}
        showFallback
        className={`select-none`}
      />
    </div>
  );
}
