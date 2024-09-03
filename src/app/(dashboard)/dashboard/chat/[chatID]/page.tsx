import db from "@lib/db";
import MainContainer from "@components/MainContainer";
import ChatBox from "@ui/ChatBox";
import { Avatar } from "@nextui-org/avatar";
import getChatMessages from "@utils/getChatMessages";
import MessageContainer from "@ui/MessageContainer";
import { type TMessage } from "@validations/chatValidations";

interface DynamicChatProps {
  params: {
    chatID: string;
  };
}

export default async function DynamicChatPage({ params }: DynamicChatProps) {
  const friendID = params.chatID.split(`--`).at(1);
  const initialMessages = await getChatMessages(params.chatID);

  const friendData = (await db.get(`user:${friendID}`)) as User;

  return (
    <MainContainer
      className={`flex max-h-screen flex-1 flex-col justify-between`}
    >
      {/* Chat Status bar */}
      <div
        className={`flex items-center gap-x-2 border-b px-4 pb-3 shadow-xl dark:border-slate-500`}
      >
        <Avatar
          src={friendData.image}
          alt={friendData.name}
          showFallback
          color={`primary`}
          size={`lg`}
          content={friendData.name}
          className={`select-none`}
        />
        <div className={``}>
          <h1 className={`text-lg font-semibold`}>{`${friendData.name}`}</h1>
          <p className={`text-xs text-slate-400`}>{friendData.email}</p>
        </div>
      </div>

      {/* All chats/messages */}
      <MessageContainer
        initialMessages={initialMessages as TMessage[]}
        friendData={friendData}
      />

      <ChatBox friendName={friendData.name} chatID={params.chatID} />
    </MainContainer>
  );
}
