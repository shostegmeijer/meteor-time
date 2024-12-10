# Fastify / React Fullstack meteor-time

This is a meteor-time to get you started with a Fastify api and React frontend. The project is setup as a monorepo using npm workspaces.

## Api

The api is a node.js fastify based http server that comes with a docker-compose setup to run a redis and mongo server for caching/persistence. Keep what you need, remove what you don't or expand if you're missing something :)

A basic PM2 configuration is provided to run the api in both development and production environments.

There are some examples in to place for caching and a basic rate-limiting setup, but do look into the relevant documentation to learn more about the respective libraries and their options.

## Frontend

The app is a React app build with vite and comes with typescript and sass configured but is otherwise pretty barebones. Set up a component library of your choice and build something cool!

Note that by default the vite.config.ts contains configuration to proxy any requests to `/api` on the dev-server to `http://localhost:4000`, ie. the locally running api. When running in production, you will need to setup this proxy on your webserver/host. A sample Netlify `_redirects` file is provided in `./app/public` that will accomplish this.

## Shared

A shared library is provided that can be used to share models or utility functions between the api and app.

## How to install

To initialize the monorepo and the root dependencies, run `npm install`.

To install the necessary dependencies in the workspaces, run `npm install --workspaces`.

To add dependencies or run scripts in a specific workspace, use the `--workspace workspace` option, e.g. `npm i left-pad --workspace app` or `npm run dev --workspace api`.

## How to run

Make sure to copy the `.env.dist` files in api and app to `.env` and fill in the blanks (if any).

1. `npm run compose:up --workspace api` (unless your api doesn't need the redis/mongo servers or if you run them some other way)
2. `npm run build:watch --workspace shared`
3. `npm run build:watch --workspace api`
4. `npm run dev --workspace api`
5. `npm run dev --workspace app`
