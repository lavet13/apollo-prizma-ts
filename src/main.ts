import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from './graphql/types/index';
import resolvers from './graphql/resolvers/index';

export interface ContextValue {
  token?: string;
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

const server = new ApolloServer<ContextValue>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/`);
