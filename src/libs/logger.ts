import { Request, Response } from 'express';
import {
    pick,
    isEmpty,
    defaults,
    omit,
    extend,
    has,
    get,
    isObject,
    isArray,
    isNumber,
} from 'lodash';
import bunyan from 'bunyan';
import BunyanFormat from 'bunyan-format';

import * as package$ from '../../package.json';

const loggers: { [key: string]: bunyan } = {};

function reqSerializer(req: Request) {
    const headers = pick(req.headers, ['host', 'user-agent', 'x-real-ip']);

    const res: any = {
        method: req.method,
        url: req.url,
        headers
    };

    if (!isEmpty(req.query)) {
        res.query = req.query;
    }

    if (!isEmpty(req.params)) {
        res.params = req.params;
    }

    if (!isEmpty(req.body)) {
        res.body = req.body;
    }

    return res;
}

function resSerializer(res: Response) {
    const headers = pick(res._headers, ['content-length', 'content-type']);

    return {
        statusCode: res.statusCode,
        headers,
        body: res.body
    };
}

function errorSerializer(error: NodeJS.ErrnoException) {
    if (!isObject(error)) {
        return error;
    }

    let message = error.name || 'Error';
    message += ': ';

    if (has(error, 'message') && !!error.message) {
        message += error.message;
    }

    const base = get(error, 'body.errors.base');

    if (isArray(base)) {
        message += base.join(', ');
    }

    const serialized: any = {
        code: error.code,
        message
    };

    if (has(error, 'stack') && isNumber(error.code) && error.code > 404) {
        serialized.stack = error.stack;
    }

    return serialized;
}

const defaultOptions: bunyan.LoggerOptions = {
    name: package$.name,
    level: 'error',
    serializers: {
        req: reqSerializer,
        res: resSerializer,
    }
};

function applyFormat(loggerOptions: bunyan.LoggerOptions) {
    if (!['development', 'test', 'production'].includes(process.env.NODE_ENV!)) {
        return {};
    }

    const formatOut = new BunyanFormat({ outputMode: 'short' });
    const logLevel = loggerOptions.ignoreLogLevel ? 'info' : process.env.LOG_LEVEL;
    const streams = [];

    streams.push({ stream: formatOut });

    return extend(loggerOptions, {
        streams,
        level: logLevel,
        serializers: extend(defaultOptions.serializers, {
            err: errorSerializer
        }),
    });
}

function createLogger(name: string, loggerOptions?: Partial<bunyan.LoggerOptions>): bunyan {
    let options = defaults(loggerOptions, defaultOptions);
    options.name = name;
    applyFormat(options);
    options = omit(options, ['ignoreLogLevel', 'client']) as bunyan.LoggerOptions;
    return bunyan.createLogger(options);
}

export function getLogger(loggerName?: string, loggerOptions?: Partial<bunyan.LoggerOptions>): bunyan {
    const name = loggerName || package$.name;
    const logger = loggers[name];

    if (!!logger) {
        return logger;
    }

    const options = defaults(loggerOptions, {
        ignoreLogLevel: false
    });

    const newLogger = createLogger(name, options);
    loggers[name] = newLogger;
    return newLogger;
}
