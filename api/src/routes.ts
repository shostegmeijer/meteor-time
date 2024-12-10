import { FastifyInstance } from "fastify";
import { getHello } from "./endpoints/hello.handler.js";

export const registerRoutes = (server: FastifyInstance) => {
    server.get("/api/hello", getHello);
};