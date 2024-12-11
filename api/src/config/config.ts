import * as dotenv from "dotenv";

const config = dotenv.config().parsed;

interface Config {
    REDIS_URL: string;
    MONGO_URL: string;
    APP_URL: string;
    NASA_API_KEY: string;
    NODE_APP_INSTANCE: string;
}

export default { ...config, NODE_APP_INSTANCE: process.env["NODE_APP_INSTANCE"] } as unknown as Config;
