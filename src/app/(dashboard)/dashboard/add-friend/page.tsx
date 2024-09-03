import AddFriendForm from "@components/AddFriendForm";
import MainContainer from "@/components/MainContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Add Friend`,
};

export default function AddFriendPage() {
  return (
    <MainContainer className={`flex px-3`}>
      <div className={`space-y-16`}>
        <h1 className={`text-2xl font-extrabold sm:text-3xl md:text-4xl`}>
          Add Friend Page
        </h1>

        <AddFriendForm />
      </div>
    </MainContainer>
  );
}
