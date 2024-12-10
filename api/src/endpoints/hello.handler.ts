import { FastifyReply, FastifyRequest } from "fastify";
import { helloApi } from "../hello/hello.api.js";

export const getHello = async (_: FastifyRequest, reply: FastifyReply) => {
    reply.status(200)
        .header("Cache-Control", "max-age=86400")
        .send({ greeting: await helloApi.fetchHello() });
};