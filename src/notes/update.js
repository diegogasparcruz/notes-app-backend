import * as dynamoDBLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context){
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDBLib.call("update", params);
    return success({ status: true });
  } catch (error) {
    console.log(error);
    return failure({ status: false });
  }
}