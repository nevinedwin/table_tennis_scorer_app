import { NextFunction, Request, Response } from "express";
import { failure } from "../utils/common.utils.js";
import jwt from 'jsonwebtoken';
import { getConfig } from "../config/config.js";

const config = getConfig();

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) return failure(res, { code: 403, message: "No token Provided" });

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) return failure(res, "Failed to authenticate token")

        req.user = decoded;

        next();
    })

}