import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <h1>Dashboard Page</h1>

      <p>Hello {session?.user?.name}</p>
    </>
  );
}
