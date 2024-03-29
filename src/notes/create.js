import uuid from 'uuid';
import * as dynamoDBLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context){
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDBLib.call("put", params);
    return success(params.Item);
  } catch (error) {
    console.log(error);
    return failure({ status: false });
  }
}