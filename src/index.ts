import { makeBadge } from 'badge-maker';
import fastify from 'fastify';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';
import { getOrdinalRank } from './rank';
import { registerSwagger } from './swagger';
import { aktiveRequestSchema, rankResponse } from './types';

const app = fastify();

app.get('/', async (_, reply) =>
  reply.redirect('https://github.com/kerolloz/aktive'),
);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

registerSwagger(app);

app.setErrorHandler((error, _, reply) =>
  error instanceof ZodError
    ? reply.status(400).send({ message: 'Bad Request', error: error.issues })
    : reply.send(error),
);

app.after(() => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/rank/:country/:username',
    schema: {
      params: aktiveRequestSchema.params,
      response: { 200: rankResponse, 400: rankResponse },
      summary: 'Get the rank of a user in a country (JSON format).',
      tags: ['json'],
    },
    handler: async ({ params }, reply) => {
      const rank = await getOrdinalRank(params.username, params.country);
      return rank ? { rank } : reply.status(400).send({ rank });
    },
  });
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:country/:username',
    schema: {
      ...aktiveRequestSchema,
      summary: 'Get the rank of a user in a country (badge format).',
      tags: ['badge'],
    },
    handler: async (request, reply) => {
      const { username, country } = request.params;
      const { style, label, labelColor, color, rnkPrefix, rnkSuffix } =
        request.query;

      const userRank = await getOrdinalRank(username, country);
      if (!userRank) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message:
            'Username not found. Please check your username and country here https://commits.top',
        });
      }

      const badge = makeBadge({
        style,
        label,
        labelColor,
        color,
        message: rnkPrefix + userRank + rnkSuffix,
      });

      reply
        .headers({
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'max-age=86400', // 1 day
        })
        .send(badge);
    },
  });
});

app.listen(
  { port: +(process.env.PORT ?? 3000), host: '::' },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
