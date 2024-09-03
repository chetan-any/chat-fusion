import { z } from "zod";

export const idSchema = z.object({
    id: z
        .string({ required_error: `ID is required !` })
        .trim()
        .min(1, { message: `ID is required` })
})

export const messageSchema = z.object({
    id: z.string({ required_error: `User ID is required` }),
    senderID: z.string({ required_error: `Sender ID is required` }),
    text: z
        .string({ required_error: `Text message is required` })
        .trim()
        .min(1, { message: `Minimum 1 character is required` }),
    timeStamp: z.number()
})

/**To validate the entire array of messages */
export const messageArraySchema = z.array(messageSchema)

export type TMessage = z.infer<typeof messageSchema>

export const textSchema = z.object({
    text: z
        .string({ required_error: `Text message is required` })
        .trim()
        .min(1, { message: `Minimum 1 character is required` }),
})

export type Text = z.infer<typeof textSchema>
