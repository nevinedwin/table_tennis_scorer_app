import constant from "./constants.utils.js";
const { STRINGS, status_codes_msg } = constant;

import { Response } from 'express';


type ResolvePromiseResultType<T> = [Error | null, T | null]

// for returning the success response
export const success = (
  res: Response,
  data: any,
  message = status_codes_msg.SUCESS.message,
) => {
  return res
    .status(200)
    .json({ message, data });
};

//for returning the error response
export const failure = (res: Response, err: any, attempts?: any) => {
  return res.status(err?.code || 500).json({
    message: err?.message || err || STRINGS.OOPS,
    attempts,
  });
};


export const resolvePromise = async <T>(promise: Promise<T>): Promise<ResolvePromiseResultType<T>> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as Error, null];
  };
};

export const isNullOrEmptyObj = (obj: any) => {
  if ([null, undefined].includes(obj) || obj.length == 0) {
    return true;
  }

  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};

