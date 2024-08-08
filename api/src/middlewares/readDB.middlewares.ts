import userModel, { IUser } from "../models/users.model.js";
import { resolvePromise } from "../utils/common.utils.js";



export const findSingleUser = (id: string): Promise<[Error | null, IUser[] | null]> => resolvePromise(userModel.findOne({ userId: id }))