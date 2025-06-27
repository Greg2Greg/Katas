import { type } from 'arktype';
import Fastify from 'fastify';
import { AnswerQcm } from '../../application/answer-qcm.ts';
import { CreateQcm } from '../../application/create-qcm.ts';
import { FileSystemQcmRepository } from '../../driven-adapter/repository/fs-qcm-repository.ts';
import { qcmValidator, answeredQcmValidator } from './schema/api-qcm.schema.ts';
import { ApiAnswerQcmPresenter } from '../../driven-adapter/presenter/api/api-answer-qcm-presenter.ts';
import { ApiCreateQcmPresenter } from '../../driven-adapter/presenter/api/api-create-qcm-presenter.ts';

const fastify = Fastify({
  logger: {},
});

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

const fileSystemQcmRepository = new FileSystemQcmRepository();

fastify.post('/create-qcm', async (request, reply) => {
  const qcm = qcmValidator(request.body);

  if (qcm instanceof type.errors) {
    throw new Error(`QCM validation error: ${qcm.summary}`);
  }

  const apiCreateQcmPresenter = new ApiCreateQcmPresenter(reply);
  const createQcm = new CreateQcm(fileSystemQcmRepository, apiCreateQcmPresenter);
  await createQcm.execute({ qcm });
});

fastify.post('/answer-qcm', async (request, reply) => {
  const answeredQcm = answeredQcmValidator(request.body);

  if (answeredQcm instanceof type.errors) {
    throw new Error(`QCM validation error: ${answeredQcm.summary}`);
  }

  const apiAnswerQcmPresenter = new ApiAnswerQcmPresenter(reply);
  const answerQcm = new AnswerQcm(apiAnswerQcmPresenter);
  await answerQcm.execute({ answeredQcm });
});

fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
