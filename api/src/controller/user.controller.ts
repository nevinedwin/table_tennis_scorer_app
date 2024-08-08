import { NextFunction, Request, Response } from "express";
import { failure, success } from "../utils/common.utils.js";
import { findSingleUser } from "../middlewares/readDB.middlewares.js";



export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [err, user] = await findSingleUser((req?.user as any)?._id as string)

        if (err || !user) throw err;

        const respData = {
            email: user?.email || "",
            displayName: user?.displayName,
            role: user?.role,
            userId: user?.userId,
            image: user?.image,
            predictionWinScore: user?.predictionWinScore,
            predictionLoseScore: user?.predictionLoseScore,
            totalPredictions: user?.totalPredictions,
            teamId: user?.teamId || "",
        };

        return success(res, respData);

    } catch (error) {
        failure(res, error);
    };
};