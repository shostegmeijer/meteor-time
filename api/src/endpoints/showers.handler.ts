import { FastifyReply, FastifyRequest } from "fastify";
import { showersApi } from "../showers/showers.api.js";

export const getShowers = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.status(200)
    .header("Cache-Control", "max-age=86400")
    .send({ showers: await showersApi.getMeteorShowers() });
};

interface GetShowerRequest {
  Params: {
    sstr: string;
  }
}

export const getShower = async (request: FastifyRequest<GetShowerRequest>, reply: FastifyReply) => {
  const { sstr } = request.params;
  reply.status(200)
    .header("Cache-Control", "max-age=86400")
    .send(await showersApi.getShowerInfo(sstr));
};