import { getConfig } from "../config/config.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel, { ROLE } from "../models/users.model.js";
import { v4 as uuidV4 } from 'uuid';
import { success } from "../utils/common.utils.js";
import { createAuthToken } from "../middlewares/auth.Middlewares.js";

const { JWT_SECRET } = getConfig();

const superAdmins = ["nevin.e@inapp.com", "abhijeeth@inapp.com", "ben.ss@inapp.com"];

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, displayName, photoUrl } = req.body;
        let token: string;

        let user = await userModel.findOne({ email });

        if (user) {

            token = createAuthToken((user as any)?._id);

        } else {

            const splitDisplayName = displayName.split(" ");

            const newName = { fname: splitDisplayName[0], lname: splitDisplayName.slice(1, splitDisplayName.length).join(" ") }

            let role = ROLE.USER;

            if (superAdmins.includes(email)) {
                role = ROLE.SUPER_ADMIN;
            };

            const userParams = {
                displayName: newName,
                role,
                email,
                userId: uuidV4(),
                ...photoUrl && { image: photoUrl },
            };

            const createUser = await new userModel(userParams).save();

            user = createUser;

            token = createAuthToken((createUser as any)._doc._id);
        }

        const newData = (user as any)._doc;


        success(res, {
            user: {
                token,
                email: newData?.email,
                displayName: newData?.displayName,
                role: newData?.role,
                userId: newData?.userId,
                image: newData.image,
                predictionWinScore: newData.predictionWinScore,
                predictionLoseScore: newData.predictionLoseScore,
                totalPredictions: newData.totalPredictions,
                teamId: newData?.teamId || "",
            }
        });

    } catch (error) {
        next(error);
    };
};