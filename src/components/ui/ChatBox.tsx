"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { sendMessage } from "@actions/sendMessage";
import { useForm } from "react-hook-form";
import { Text, textSchema } from "@validations/chatValidations";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError } from "zod";
import cn from "@utils/cn";
import { IoIosSend } from "react-icons/io";

interface ChatBoxProps {
  friendName: string;
  chatID: string;
  className?: string;
}

export default function ChatBox({
  friendName,
  chatID,
  className,
}: ChatBoxProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Text>({ resolver: zodResolver(textSchema) });

  const onSubmit = async (data: Text) => {
    if (errors.text) {
      toast.error(errors.text.message);
    }

    try {
      const result = await sendMessage(data.text, chatID);
      toast.success(result);
    } catch (error) {
      if (error instanceof Error || error instanceof ZodError) {
        toast.error(error.message);
      } else {
        toast.error(`Something went wrong`);
      }
    } finally {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        `scrollbar scrollbar-track scrollbar-thumb border-t px-4 py-6 dark:border-slate-500`,
        className,
      )}
    >
      <fieldset className={`flex h-full items-center gap-x-3`}>
        <Input
          {...register(`text`)}
          inputMode={`text`}
          autoFocus
          isClearable
          placeholder={`Message ${friendName}`}
          radius={`md`}
          size={`lg`}
          classNames={{
            inputWrapper: cn(`input-focus`),
          }}
        />

        <Tooltip
          content={`${isSubmitting ? "Sending" : "Send Message"}`}
          size={`sm`}
          radius={`full`}
          color={`success`}
          placement={`top-end`}
          showArrow
          offset={1}
        >
          <Button
            type={`submit`}
            isIconOnly
            variant={`shadow`}
            radius={`md`}
            disabled={isSubmitting}
            className={`bg-green-600 text-center ring-2 ring-green-700 ring-offset-2 dark:ring-green-400 dark:ring-offset-black`}
          >
            {isSubmitting && <Spinner color={`white`} size={`sm`} />}

            {!isSubmitting && (
              <IoIosSend
                className={`flex size-9 shrink-0 rounded-full p-1 text-white shadow-lg`}
              />
            )}
          </Button>
        </Tooltip>
      </fieldset>
    </form>
  );
}
