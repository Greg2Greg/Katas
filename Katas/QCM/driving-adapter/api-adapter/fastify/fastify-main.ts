import Fastify from 'fastify';
import { QcmController } from '../qcm.controller.ts';
import { FastifyWebserver } from './fastify-webserver.ts';
import { activateReplDebugMode } from './repl-debug-mode.ts';

const fastify = Fastify({
  logger: {},
});

new FastifyWebserver(fastify)
  .withPort(3000)
  .withBeforeStartHook((server) => activateReplDebugMode(server))
  .registerRoutes(QcmController)
  .start();
