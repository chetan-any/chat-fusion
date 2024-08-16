import { logOut } from "@actions/auth";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <h1>Dashboard Page</h1>

      <pre>{JSON.stringify(session)}</pre>

      <p>Hello {session?.user?.name}</p>

      <form action={logOut}>
        <Button
          type={`submit`}
          variant={`flat`}
          color={`danger`}
          radius={`sm`}
          className={`font-semibold`}
        >
          Logout
        </Button>
      </form>
    </>
  );
}
