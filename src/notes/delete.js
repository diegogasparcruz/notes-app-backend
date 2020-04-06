import * as dynamoDBLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context){
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await dynamoDBLib.call("delete", params);
    return success({ status: true });
  } catch (error) {
    console.log(error);
    return failure({ status: false });
  }
}