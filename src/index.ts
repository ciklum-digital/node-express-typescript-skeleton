import http from 'http';
import tooBusy from 'toobusy-js';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import {isNil, isString} from 'lodash';

import { getLogger } from './libs/logger';
import { router } from './router';
import { errorResponder, finalResponder } from './libs/responders';
import { authMiddleware } from '~service/libs/middlewares/auth';
import {
  noCacheMiddleware,
  tooBusyMiddleware,
  requestLoggerMiddleware,
} from './libs/middlewares';

import * as package$ from '../package.json';
import { AddressInfo } from 'net';

process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error';

const logger = getLogger('APP-SVC');
const port = process.env.SVC_PORT || 4000;

logger.info(`[ENV_NAME = ${process.env.ENV_NAME}]`);
logger.info(`[LOG_LEVEL = ${process.env.LOG_LEVEL}]`);
logger.info(`[NODE_ENV = ${process.env.NODE_ENV}]`);
logger.info(`[SVC_PORT = ${port}]`);
logger.info(`[SVC_MOUNT_POINT = ${process.env.SVC_MOUNT_POINT}]`);

logger.info(`Starting app [${package$.name}] ...`);

const app = express();

app.set('port', port);
app.set('x-powered-by', false);
app.set('query parser', 'extended');
app.use(cors());
app.use(tooBusyMiddleware);
app.use(cookieParser());
app.use(requestLoggerMiddleware);
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(noCacheMiddleware);

//initializes the passport configuration.
app.use(passport.initialize());
authMiddleware(passport);

app.use(router);

errorResponder.use(app);
app.use(finalResponder.router);

const index = http.createServer(app);

index.listen(port);

index.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      logger.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

index.on('listening', () => {
  const address = index.address();

  if (isNil(address)) {
    logger.error('OS hasn\'t reported back with the right address');
    return process.exit(1);
  }

  const bind = isString(address)
    ? `pipe ${address}`
    : `port ${(address as AddressInfo).port}`;
  logger.info(`Listening on ${bind}`);
});

index.on('close', () => {
  logger.info('Server stopped');
});

process.on('SIGINT', () => {
  tooBusy.shutdown();
  process.exit();
});

process.on('unhandledRejection', (reason, p) => {
  logger.warn('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
