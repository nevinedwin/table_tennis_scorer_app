import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * 
 * @param {String} action 
 * @param {Object} params 
 * @returns null;
 */
export const dynamoDBOperation = (action, params) => dynamoDb[action](params).promise();
