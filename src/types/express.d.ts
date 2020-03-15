declare namespace Express {
    interface Response {
        body: any;
        _headers: import('http').IncomingHttpHeaders;
        template?: string;
        opts?: Object;
        response?: any;
    }

    interface Request {
        logger: any;
        _parsedUrl: any;
    }
}