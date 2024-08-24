import { Metadata } from "next";
import MainContainer from "@components/MainContainer";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default async function DashboardPage() {
  return (
    <MainContainer className={`flex min-h-[200vh] flex-col`}>
      <h1 className={``}>Dashboard Page</h1>
    </MainContainer>
  );
}
