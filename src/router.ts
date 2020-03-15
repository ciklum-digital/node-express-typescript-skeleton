import { Router, Request, Response, NextFunction } from 'express';
import * as url from 'url';
import * as path from 'path';
import * as HttpStatusCodes from 'http-status-codes';

import { isNil } from 'lodash';
import { versionRouter } from './modules/version';
import { docsRouter } from './modules/docs';

const mountPoint = process.env.SVC_MOUNT_POINT || '/api';
export const router = Router();

router.use(mountPoint, [
    versionRouter,
    docsRouter,
    (req: Request, res: Response, next: NextFunction) => {
        if (isNil(req.route)) {
            res.statusCode = HttpStatusCodes.NOT_FOUND;
        }

        return next();
    },
]);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  if (
    req.route ||
    res.statusCode === HttpStatusCodes.NOT_FOUND ||
    res.statusCode === HttpStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    return next();
  }

  if (path.extname(url.parse(req.originalUrl).pathname!)) {
    res.statusCode = HttpStatusCodes.NOT_FOUND;
    return next();
  }

  return next();
});
