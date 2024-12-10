
import { randomUUID } from "crypto";
import fastify from "fastify";
import "reflect-metadata";
import { setupCache } from "./cache/cache.js";
import dataSource from "./data-source/data-source.js";
import { registerPlugins } from "./plugins.js";
import { registerRoutes } from "./routes.js";

const startServer = async () => {
  await setupCache();
  await dataSource.initialize();

  const server = fastify({
    genReqId: () => randomUUID().toString()
  });

  await registerPlugins(server);
  registerRoutes(server);

  server.setNotFoundHandler({
    preHandler: server.rateLimit({ max: 5, timeWindow: '1 minute' })
  }, (_request, reply) => {
    reply.code(404).send("");
  });

  server.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    if (error.statusCode === 429) {
      return reply.code(429).send({ error: "You hit the rate limit! Slow down please!" });
    }

    reply.code(500).send({ error: "Oops! Something went wrong :(" });
  });

  server.listen({ port: 4000 });
};

startServer();

export default startServer;