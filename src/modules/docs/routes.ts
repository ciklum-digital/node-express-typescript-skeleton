import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from  './swagger.json';

export const docsRouter = Router();

docsRouter.use('/docs', swaggerUi.serve);
docsRouter.get('/docs', swaggerUi.setup(swaggerDocument));
