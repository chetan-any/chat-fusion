import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LogInForm from "@ui/LogInForm";

export const metadata: Metadata = {
  title: `Login`,
};

export default async function () {
  const session = await auth();
  if (session?.user) {
    redirect(`/dashboard`);
  }

  return <LogInForm />;
}
