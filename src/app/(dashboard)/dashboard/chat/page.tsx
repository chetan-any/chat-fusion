import { Metadata } from "next";
import MainContainer from "@components/MainContainer";

export const metadata: Metadata = {
  title: `Chat`,
};

export default function Chat() {
  return (
    <MainContainer>
      <h1 className={`text-3xl font-extrabold`}>Chat with your friends</h1>
    </MainContainer>
  );
}
