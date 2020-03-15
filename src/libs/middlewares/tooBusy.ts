import {
    Request,
    Response,
    NextFunction,
} from 'express';
import HttpStatusCodes from 'http-status-codes';
import toobusy from 'toobusy-js';

toobusy.maxLag(300);
toobusy.interval(500);

export function tooBusyMiddleware(req: Request, res: Response, next: NextFunction) {
    const free = !toobusy();

    if (free) {
        return next();
    }

    const error = new Error('I\'m busy right now, sorry.');
    error.code = HttpStatusCodes.SERVICE_UNAVAILABLE;
    delete error.stack;
    return next(error);
}
