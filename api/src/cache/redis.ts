import IoRedis from "ioredis";
import config from "../config/config.js";

export const redisClient = new IoRedis.default(config.REDIS_URL);