"use client";

import cn from "@utils/cn";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function LogOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSubmit = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast.success(`Successfully signout out.`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(`Something went wrong!`);
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Button
      type={`submit`}
      variant={`shadow`}
      color={`danger`}
      radius={`sm`}
      size={`sm`}
      disabled={isSigningOut}
      onClick={handleSubmit}
      className={cn(`font-semibold`, { "dark:bg-gray-400": isSigningOut })}
    >
      {isSigningOut ? `Logging Out` : `Logout`}
    </Button>
  );
}
