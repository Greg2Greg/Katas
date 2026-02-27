import { FastifyInstance } from 'fastify';

export async function activateReplDebugMode(fastify: FastifyInstance) {
  if (process.env.REPL_DEBUG_MODE) {
    fastify.addHook('onSend', async (request, reply, payload) => {
      request.log.info(
        {
          statusCode: reply.statusCode,
          responseBody: typeof payload === 'string' ? payload : JSON.stringify(payload),
        },
        'Réponse envoyée'
      );

      return payload;
    });
  }
}
