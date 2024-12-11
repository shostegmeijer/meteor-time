import { FastifyReply, FastifyRequest } from "fastify";
import { showersApi } from "../showers/showers.api.js";

export const getShowers = (_: FastifyRequest, reply: FastifyReply) => {
  reply.status(200)
    .header("Cache-Control", "max-age=86400")
    .send({ showers: showersApi.getMeteorShowers() });
};