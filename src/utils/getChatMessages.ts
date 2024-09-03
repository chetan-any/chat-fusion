import db from "@lib/db";
import { toast } from "sonner";
import { messageArraySchema } from "@validations/chatValidations";
import { ZodError } from "zod";


export default async function (chatID: string) {
    try {
        const allMessages = (await db.zrange(
            `chat:${chatID}:messages`,
            0,
            -1,
        )) as string[];

        console.log(allMessages);

        const reversedMessageArray = allMessages.reverse();

        const validatedMessages = messageArraySchema.parse(reversedMessageArray);

        return validatedMessages
    } catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
            toast.error(error.message);
        } else {
            toast.error(`Something went wrong`);
        }
    }
};