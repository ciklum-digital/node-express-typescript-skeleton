import { Strategy, ExtractJwt } from 'passport-jwt';
const secret = process.env.AUTH_SECRET || 'test';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

export function authMiddleware(passport: any) {
    passport.use(new Strategy(opts, async (payload, next)=> {
        const user = {};
        next(null, user);
    }));
}