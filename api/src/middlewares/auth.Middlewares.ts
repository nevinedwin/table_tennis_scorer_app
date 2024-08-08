import { NextFunction, Request, Response } from "express";
import { failure } from "../utils/common.utils.js";
import jwt from 'jsonwebtoken';
import { getConfig } from "../config/config.js";

const { JWT_SECRET } = getConfig()

declare module 'express' {
    export interface Request {
        user?: IJWTPayload;
    }
}


export interface IJWTPayload {
    _id: string;
};

const authTokenExpiry = "36000s"; //10hrs

// create auth token
export const createAuthToken = (id: string) => {
    return jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: authTokenExpiry });
};


// verify token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers['Authorization'] as string || req.headers['authorization'] as string;

    if (!token) return failure(res, { code: 401, message: "No Token provided" });

    token = token.split(" ")[1];

    try {

        const user = await new Promise<IJWTPayload>((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded as IJWTPayload)
                }
            })
        })

        req.user = user;
        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return failure(res, { code: 403, message: "Invalid Token" });
        };
        return failure(res, { code: 500, message: "Internal Server Error" });
    };
};
