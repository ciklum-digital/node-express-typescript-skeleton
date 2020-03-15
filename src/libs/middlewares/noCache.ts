import {
    Request,
    Response,
    NextFunction,
} from 'express';

export function noCacheMiddleware(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.setHeader('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
    next();
}
