import { Redis } from "@upstash/redis";

/** `Redis client` :  It acts as a bridge between your application and the underlying database. */
const db = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL as string,
    token: process.env.UPSTASH_REDIS_REST_TOKEN as string
})


export default db