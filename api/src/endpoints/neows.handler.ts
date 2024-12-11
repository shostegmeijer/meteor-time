import { FastifyReply, FastifyRequest } from "fastify";
import { neowsApi } from "../neows/neows.api.js";

export const getNeows = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.status(200)
    .header("Cache-Control", "max-age=86400")
    .send(await neowsApi.getAsteroids());
};