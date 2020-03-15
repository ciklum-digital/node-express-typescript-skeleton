import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import * as package$ from '../../../package.json';

async function get(req: Request, res: Response, next: NextFunction) {
    const packageName = package$.name || 'not specified';
    const packageVersion = package$.version || 'not specified';
    res.body = `${packageName}:${packageVersion}`;
    res.statusCode = HttpStatusCodes.OK;
    next();
}

export const versionHandler = { get };
