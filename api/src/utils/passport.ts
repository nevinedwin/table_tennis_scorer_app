import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";
import { getConfig } from "../config/config.js";
import { findSingleUser } from "../middlewares/readDB.middlewares.js";
import { createUser } from "../middlewares/writeDB.middleware.js";
import { IUser } from "../models/users.model.js";

const config = getConfig();

const isValidCompanyEmail = (email: string): boolean => {
    return email.split("@")[1] === "inapp.com";
};

passport.use(
    new OAuth2Strategy({
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECERET,
        callbackURL: config.CALLBACK_URL,
        scope: ["profile", "email"]
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const [fetch_err, old_user] = await findSingleUser(profile.id);

            if (fetch_err) {
                return done(new Error(`Error in Fetching DB: ${fetch_err}`));
            }

            if (old_user && old_user.length) {
                return done(null, old_user[0]);
            }

            const email = profile.emails ? profile.emails[0].value : "";

            if (!isValidCompanyEmail(email)) {
                return done(null, { error: 'Please use a company email address.' });
            }

            const params = {
                userId: profile.id,
                displayName: profile.displayName,
                email,
                image: profile.photos ? profile.photos[0].value : ""
            };

            const [write_err, new_user] = await createUser(params);

            if (write_err) {
                return done(new Error(`Saving user to db get error: ${write_err}`));
            }

            return done(null, new_user || false);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});