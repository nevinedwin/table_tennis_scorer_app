import userModel, { IUserType } from "../models/users.model.js";
import { resolvePromise } from "../utils/common.utils.js";



export const createUser = (data: IUserType) => resolvePromise(new userModel(data).save());