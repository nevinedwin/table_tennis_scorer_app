/**
 *
 * @param {Number} statusCode - status code
 * @param {Object} body
 * @returns Object
 */
export const buildResponse = (statusCode, body) => {
  const respObj = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
  return respObj;
};

/**
 *
 * @param {Objec} body
 * @returns Object
 */
export const success = (body) => {
  return buildResponse(200, body);
};

/**
 *
 * @param {Objec} body
 * @returns Object
 */
export const failure = (body) => {
  body = body || { status: false, error: "Invalid Request" };
  return buildResponse(500, body);
};

/**
 *
 * @param {Objec} body
 * @returns Object
 */
export const badRequest = (body) => {
  body = body || { status: false, error: "Bad Request" };
  return buildResponse(400, body);
};

/**
 *
 * @param {Objec} body
 * @returns Object
 */
export const notFound = (body) => {
  body = body || { status: false, error: "Not Found" };
  return buildResponse(404, body);
};

export const unAuthorized = (body) => {
  body = body || { status: false, error: "UnAuthorized" };
  return buildResponse(401, body);
};
