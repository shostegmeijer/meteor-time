import { useAdapter } from "@type-cacheable/ioredis-adapter";
import { redisClient } from "./redis.js";

export { redisClient };

export const setupCache = async () => {
    await redisClient.flushall();
    console.log("flushing cache");
    useAdapter(redisClient);
};