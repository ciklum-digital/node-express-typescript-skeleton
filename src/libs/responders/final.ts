import {
    Router,
    Request,
    Response,
    NextFunction,
} from 'express';
import { isString } from 'lodash';

const router = Router();

function sendResponse(req: Request, res: Response, next: NextFunction) {
    if (res.template) {
        return res.render(res.template, res.opts);
    }

    const { response, body } = res;

    if (!response && !body) {
        return next();
    }

    if (req.accepts('json') !== 'json' || isString(body)) {
        return res.send(response || body);
    }

    return res.json(response || body);
}

router.use((req, res, next) => {
    sendResponse(req, res, next);
});

export const finalResponder = { router };
