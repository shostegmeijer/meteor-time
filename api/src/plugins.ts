import { fastifyCors } from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";
import { redisClient } from "./cache/redis.js";
import config from "./config/config.js";

export const registerPlugins = async (server: FastifyInstance) => {
    await server
        .register(fastifyRateLimit.default, {
            max: 100,
            timeWindow: 60_000,
            redis: redisClient,
            ban: 15,
            continueExceeding: true,
        })
        .register(fastifyCors, { origin: config.APP_URL })
};
