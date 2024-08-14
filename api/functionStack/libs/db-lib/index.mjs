import { dynamoDBOperation } from "../dynamodb-lib/index.mjs";
import { success, failure } from "../response-lib/index.mjs";

/**
 *
 * @param {Object} params - params for add data to db
 * @param {Boolean} end - end the program or not
 * @returns [error, success]
 */
export const post = async (params, end = false) => {
  try {
    console.log("db write intiated");
    const postResourceResp = await dynamoDBOperation("put", params);
    const response = {
      status: true,
      statusMessage: "Successfully data Added to DynamoDB",
    };
    console.log(`db write completed`);
    if (end) {
      return success(response);
    }
    return [null, { ...response, data: postResourceResp }];
  } catch (error) {
    const response = {
      status: false,
      statusMessage: "Error in Adding data to DynamoDB",
    };
    if (end) {
      return failure({ ...response, error });
    }
    return [{ ...response, error }];
  }
};

/**
 *
 * @param {Object} params - params for db query
 * @param {Boolean} returnFullResp - returning full data or not
 * @returns [error, success]
 */
export const get = async (params, returnFullResp = true) => {
  try {
    console.log(`db fetching initiated`);
    const result = await dynamoDBOperation("get", params);
    if (returnFullResp) return [null, result];
    console.log(`db fetching completed`);
    return [null, result?.Item || result];
  } catch (error) {
    console.log(`error: ${error}`);
    return [error];
  }
};

/**
 *
 * @param {Object} params - params for db query
 * @param {Boolean} returnFullResp - returning full data or not
 * @returns [error, success]
 */
export const query = async (params, returnFullResp = true) => {
  try {
    console.log(`db querying initiated`);
    const result = await dynamoDBOperation("query", params);
    if (returnFullResp) return [null, result];
    console.log(`db querying completed`);
    return [null, result?.Item || result];
  } catch (error) {
    console.log(`error: ${error}`);
    return [error];
  }
};


export const put = async (params, end = false) => {
  try {
    console.log(`db update initiated`);
    const updateResp = await dynamoDBOperation("update", params);
    if (end) return success({ status: true, message: "updated successfully" });
    console.log(`db updated completed`);
    return [null, { status: true, data: updateResp }];
  } catch (error) {
    console.log(`error: ${JSON.stringify(error)}`);
    return [error];
  }
};


