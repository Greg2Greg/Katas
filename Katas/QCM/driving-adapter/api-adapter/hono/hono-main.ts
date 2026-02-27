import { Hono } from 'hono';
import { HonoWebserver } from './hono-webserver.ts';
import { QcmController } from '../qcm.controller.ts';

const hono = new Hono();
new HonoWebserver(hono).withPort(3000).registerRoutes(QcmController).start();
