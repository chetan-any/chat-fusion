import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import db from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: UpstashRedisAdapter(db),

    pages: {
        signIn: "/login",
        signOut: "/dashboard"
    },

    providers: [Google, GitHub]
})
