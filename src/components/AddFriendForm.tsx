"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, TEmailSchema } from "@utils/form/types";
import cn from "@utils/cn";
import { FaUser } from "react-icons/fa";
import { addFriend } from "@actions/addFriend";
import { useState } from "react";

type StatusMessageProps = {
  className?: string;
  children?: React.ReactNode;
};

const StatusMessage = ({
  className = `Some text`,
  children,
}: StatusMessageProps) => {
  return (
    <p
      className={cn(`line-clamp-4 max-w-[35ch] text-pretty text-sm`, className)}
    >
      {children}
    </p>
  );
};

/** A `resolver` is a function that acts as a bridge between your form data and a validation library like `Zod`. It takes the submitted form data as input and validates it according to the rules defined in your schema.
 *
 * The `zodResolver` function takes your `Zod schema` as an argument. It wraps the default validation logic of `React Hook Form` and uses the `Zod schema` for more robust and type-safe validation.
 */
export default function AddFriendForm() {
  const [operationMessage, setOperationMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TEmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: TEmailSchema) => {
    const requestStatus = await addFriend(data.email);

    setOperationMessage(requestStatus as string);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4`}>
      <div className={`space-y-1`}>
        <Input
          {...register("email")}
          autoFocus
          label={`Add friend by E-Mail`}
          type={`email`}
          inputMode={`email`}
          isClearable
          labelPlacement={`outside`}
          placeholder={`you@example.com`}
          startContent={<FaUser size={16} />}
          radius={`sm`}
          classNames={{
            inputWrapper: cn(
              `focus-within:ring-2 ring-offset-2 ring-offest-white dark:ring-offset-black ring-blue-600 w-[30ch]`,
            ),
            input: cn(`placeholder:select-none`),
          }}
        />

        {operationMessage && !errors.email && (
          <StatusMessage className={`text-green-400`}>
            {operationMessage}
          </StatusMessage>
        )}

        {errors.email && (
          <StatusMessage className={`text-rose-400`}>
            {errors.email?.message as string}
          </StatusMessage>
        )}
      </div>

      <Button
        disabled={isSubmitting}
        type={`submit`}
        variant={`shadow`}
        radius={`sm`}
        color={`primary`}
        fullWidth
        className={`font-semibold ${isSubmitting && "bg-gray-600"}`}
      >
        {isSubmitting ? `Sending Request...` : ` Add Friend`}
      </Button>
    </form>
  );
}
