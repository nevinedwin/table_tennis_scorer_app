import { getConfig } from "../config/config.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel, { ROLE } from "../models/users.model.js";
import { v4 as uuidV4 } from 'uuid';

const { JWT_SECRET } = getConfig();

const superAdmins = ["nevin.e@inapp.com", "abhijeeth@inapp.com", "ben.ss@inapp.com"];

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, displayName, photoUrl } = req.body;
        let token: string;

        let user = await userModel.findOne({ email });

        if (user) {

            token = jwt.sign({ id: user._id }, JWT_SECRET)

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

            const createUser = new userModel(userParams);
            await createUser.save()

            user = createUser;

            token = jwt.sign({ id: createUser._id }, JWT_SECRET)
        }

        const expireDate = new Date(Date.now() + (11 * 3600000)) //11 hrs

        res.cookie('access_token', token, {
            httpOnly: true,
            expires: expireDate
        }).status(200).json(user)

    } catch (error) {
        next(error);
    };
};