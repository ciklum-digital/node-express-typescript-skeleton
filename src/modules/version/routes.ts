import { Router } from 'express';

import { versionHandler } from './handler';

export const versionRouter = Router();

versionRouter.get('/version', versionHandler.get);
