import { FastifyInstance } from "fastify";
import { getHello } from "./endpoints/hello.handler.js";
import { getNeows } from "./endpoints/neows.handler.js";
import { getShowers } from "./endpoints/showers.handler.js";

export const registerRoutes = (server: FastifyInstance) => {
    server
        .get("/api/hello", getHello)
        .get("/api/neows", getNeows)
        .get("/api/showers", getShowers);
};
