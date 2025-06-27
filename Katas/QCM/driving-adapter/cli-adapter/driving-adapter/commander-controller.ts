import { program } from 'commander';
import { AnswerQcm } from '../../../application/answer-qcm.ts';
import { CreateQcm } from '../../../application/create-qcm.ts';
import { RealUuidProvider } from '../../../shared/provider/uuid/real-uuid-provider.ts';
import { AnswerQcmWithPrompt } from '../application/answer-qcm-with-prompt.ts';
import { ComposeQcmWithPrompt } from '../application/compose-qcm-with-prompt.ts';
import { InquirerAnswerPrompt } from '../driven-adapter/inquirer-answer-prompt.ts';
import { InquirerQuestionPrompt } from '../driven-adapter/inquirer-question-prompt.ts';
import { FileSystemQcmRepository } from '../../../driven-adapter/repository/fs-qcm-repository.ts';
import { CliCreateQcmPresenter } from '../../../driven-adapter/presenter/cli/cli-create-qcm.presenter.ts';
import { CliAnswerQcmPresenter } from '../../../driven-adapter/presenter/cli/cli-answer-qcm.presenter.ts';

const questionPrompt = new InquirerQuestionPrompt();
const answerPrompt = new InquirerAnswerPrompt();
const realUuidProvider = new RealUuidProvider();
const fsQcmRepository = new FileSystemQcmRepository();
const cliCreateQcmPresenter = new CliCreateQcmPresenter();
const cliAnswerQcmPresenter = new CliAnswerQcmPresenter();
const createQcm = new CreateQcm({
  createQcmPresenter: cliCreateQcmPresenter,
  qcmRepository: fsQcmRepository,
});
const answerQcm = new AnswerQcm({ answerQcmPresenter: cliAnswerQcmPresenter });
const composeQcmWithPrompt = new ComposeQcmWithPrompt({
  createQcm,
  questionPrompt,
  uuidProvider: realUuidProvider,
});
const answerQcmWithPrompt = new AnswerQcmWithPrompt({
  qcmRepository: fsQcmRepository,
  answerQcm,
  answerPrompt,
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
    await composeQcmWithPrompt.execute();
  });

program
  .command('answer-qcm')
  .description('Answer a QCM')
  .argument('<qcm-id>', 'The QCM id to answer to')
  .action(async (qcmId: string) => {
    await answerQcmWithPrompt.execute({ qcmId });
  });

/*
  To launch without debugger: pnpx tsx Katas/QCM/controller/cli-controller.ts <command> <args>
  To launch with debugger Run and Debug => Debug CLI (Commander)

  Commander is not an REPL, here a little code to adapt, so it is more conveniant to use 
  commands in debug mode.

  Only way to exit is to send SIGINT via CTRL+C.
*/
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
