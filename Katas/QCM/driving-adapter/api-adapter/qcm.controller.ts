import path from 'path';
import { AnswerQcm } from '../../application/answer-qcm.usecase.ts';
import { CreateQcm } from '../../application/create-qcm.usecase.ts';
import { QcmAnswerFactory } from '../../domain/entity/qcm-answer/qcm-answer.factory.ts';
import { QcmFactory } from '../../domain/entity/qcm/qcm.factory.ts';
import { ApiAnswerQcmPresenter } from '../../driven-adapter/presenter/api/api-answer-qcm.presenter.ts';
import { ApiCreateQcmPresenter } from '../../driven-adapter/presenter/api/api-create-qcm.presenter.ts';
import { FileSystemQcmRepository } from '../../driven-adapter/repository/fs-qcm.repository.ts';
import { RealUuidProvider } from '../../shared/provider/uuid/real-uuid.provider.ts';
import { validateAnswerQcmInput } from '../../shared/schema/answer-qcm.validator.ts';
import { validateCreateQcmInput } from '../../shared/schema/create-qcm.validator.ts';
import { Webserver } from '../../shared/abstraction/webserver.ts';

const realUuidProvider = new RealUuidProvider();
const qcmFactory = new QcmFactory(realUuidProvider);
const qcmAnswerFactory = new QcmAnswerFactory(realUuidProvider);
const filepath = path.resolve('./Katas/QCM', 'qcm.json');
const fileSystemQcmRepository = new FileSystemQcmRepository(qcmFactory, filepath);

export const QcmController = <TServer>(webserver: Webserver<TServer>) => {
  webserver.post('/create-qcm', async (request, reply) => {
    const questionsDto = validateCreateQcmInput(request.body);

    const apiCreateQcmPresenter = new ApiCreateQcmPresenter(reply);
    const createQcm = new CreateQcm({
      createQcmPresenter: apiCreateQcmPresenter,
      qcmRepository: fileSystemQcmRepository,
      qcmFactory,
    });

    await createQcm.execute({ questionsDto });
  });

  webserver.post('/answer-qcm', async (request, reply) => {
    const answeredQcm = validateAnswerQcmInput(request.body);

    const apiAnswerQcmPresenter = new ApiAnswerQcmPresenter(reply);
    const answerQcm = new AnswerQcm({
      answerQcmPresenter: apiAnswerQcmPresenter,
      qcmAnswerFactory,
      qcmRepository: fileSystemQcmRepository,
    });

    await answerQcm.execute({ answersDto: answeredQcm.answers, qcmId: answeredQcm.qcmId });
  });
};
