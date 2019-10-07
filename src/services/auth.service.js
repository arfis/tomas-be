import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.model';
import { devConfig } from '../constants/constants';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const localOpts = {
    usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        console.log('local strategy');
        const user = await User.findOne({
            email
        });
        if (!user) {
            return done(null, false);
        } else if (!user.authenticateUser(password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

// Jwt strategy
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: devConfig.JWT_SECRET
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
        //Identify user by ID
        console.log('heree ', devConfig.JWT_SECRET);
        const user = await User.findById(payload._id);

        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
