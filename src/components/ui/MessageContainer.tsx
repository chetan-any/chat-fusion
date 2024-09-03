import { type TMessage } from "@validations/chatValidations";
import Message from "@components/Message";
import { auth } from "@lib/auth";

interface MessageContainerProps {
  initialMessages: TMessage[];
  friendData: User;
}

export default async function MessageContainer({
  initialMessages,
  friendData,
}: MessageContainerProps) {
  const session = await auth();
  const user = session?.user as User;

  return (
    <section
      className={`scrollbar scrollbar-track scrollbar-thumb my-2 flex flex-col-reverse gap-y-5 overflow-y-auto p-4`}
    >
      {initialMessages.map((message) => {
        return (
          <Message
            key={message.id}
            message={message}
            user={user}
            friendData={friendData}
          />
        );
      })}
    </section>
  );
}
