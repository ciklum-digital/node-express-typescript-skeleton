export class ValidationError extends Error {
    constructor (public message: string, public errors: any, public code = 400) {
        super();
    }
}

export class MapperError extends Error {
    constructor (public message: string, public error: any, public code = 400) {
        super();
    }
}

export class ApiError extends Error {
    public error: any;
    public code: number;

    constructor (public message: string, { code, error }: any) {
        super();

        this.error = error;
        this.code = code;
    }
}

export class NotFoundError extends Error {
    constructor (public message: string, public error: any, public code = 404) {
        super();
    }
}
