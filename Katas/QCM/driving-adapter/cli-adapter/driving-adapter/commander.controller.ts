import { program } from 'commander';
import path from 'node:path';
import { AnswerQcm } from '../../../application/answer-qcm.usecase.ts';
import { CreateQcm } from '../../../application/create-qcm.usecase.ts';
import { CliAnswerQcmPresenter } from '../../../driven-adapter/presenter/cli/cli-answer-qcm.presenter.ts';
import { CliCreateQcmPresenter } from '../../../driven-adapter/presenter/cli/cli-create-qcm.presenter.ts';
import { FileSystemQcmRepository } from '../../../driven-adapter/repository/fs-qcm.repository.ts';
import { RealUuidProvider } from '../../../shared/provider/uuid/real-uuid.provider.ts';
import { AnswerQcmWithPrompt } from '../application/answer-qcm-with-prompt.ts';
import { ComposeQcmWithPrompt } from '../application/compose-qcm-with-prompt.ts';
import { InquirerAnswerPrompt } from '../driven-adapter/inquirer-answer-prompt.ts';
import { InquirerQuestionPrompt } from '../driven-adapter/inquirer-question-prompt.ts';
import { QcmFactory } from '../../../domain/entity/qcm/qcm.factory.ts';
import { QcmAnswerFactory } from '../../../domain/entity/qcm-answer/qcm-answer.factory.ts';

const questionPromptAdapter = new InquirerQuestionPrompt();
const answerPromptAdapter = new InquirerAnswerPrompt();
const realUuidProvider = new RealUuidProvider();
const qcmFactory = new QcmFactory(realUuidProvider);
const qcmAnswerFactory = new QcmAnswerFactory(realUuidProvider);
const filepath = path.resolve('./Katas/QCM', 'qcm.json');
const fsQcmRepository = new FileSystemQcmRepository(qcmFactory, filepath);
const cliCreateQcmPresenter = new CliCreateQcmPresenter();
const cliAnswerQcmPresenter = new CliAnswerQcmPresenter();
const createQcm = new CreateQcm({
  createQcmPresenter: cliCreateQcmPresenter,
  qcmRepository: fsQcmRepository,
  qcmFactory,
});
const answerQcm = new AnswerQcm({
  answerQcmPresenter: cliAnswerQcmPresenter,
  qcmAnswerFactory,
  qcmRepository: fsQcmRepository,
});
const composeQcmWithPrompt = new ComposeQcmWithPrompt({
  questionPromptAdapter,
});
const answerQcmWithPrompt = new AnswerQcmWithPrompt({
  qcmRepository: fsQcmRepository,
  answerPromptAdapter,
});

program
  .name('qcm-editor')
  .description('CLI to create and answer QCMs')
  .version('1.0.0')
  .exitOverride((e) => {
    throw e;
  });

program
  .command('create-qcm')
  .description('Create a QCM')
  .action(async () => {
    const questionsDto = await composeQcmWithPrompt.execute();
    await createQcm.execute(questionsDto);
  });

program
  .command('answer-qcm')
  .description('Answer a QCM')
  .argument('<qcm-id>', 'The QCM id to answer to')
  .action(async (qcmId: string) => {
    const answersDto = await answerQcmWithPrompt.execute({ qcmId });
    await answerQcm.execute(answersDto);
  });

async function start() {
  if (!process.env.REPL_DEBUG_MODE) {
    program.parse();
    return;
  }

  console.log('REPL mode enabled. Type commands like: create-qcm or answer-qcm <qcm-id>');
  const readline = await import('node:readline/promises');
  const nodeRepl = readline.createInterface({ input: process.stdin, output: process.stdout });
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // Resume to keep alive event loop and thus Node's process
      process.stdin.resume();

      const line = await nodeRepl.question('> ');
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }

      const args = trimmed.split(/\s+/);

      await program.parseAsync(args, { from: 'user' });
    } catch (err) {
      console.log('Commander error:', err);
    }
  }
}

start();
