import passport from "passport";
import { getConfig } from "../config/config.js";
import { NextFunction, Request, Response } from "express";
import { failure, success } from "../utils/common.utils.js";
import jwt from "jsonwebtoken";

const config = getConfig();

export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleAuthCallback = passport.authenticate("google", {
    successRedirect: config.SUCCESS_REDIRECT_URL,
    failureRedirect: config.FAILURE_REDIRECT_URL
})

export const login = async (req: Request, res: Response) => {
    if (req.user) {
        return success(res, req.user, "User Logged In");
    } else {
        return failure(res, "User Logged In Failure");
    };
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logOut(function (err) {
        if (err) return next(err);
        return success(res, "logged out");
    });
};