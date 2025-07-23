const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
    console.log("Received event: " + JSON.stringify(event));
    const ttlTime = Date.now() / 1000 + 86400; //One day later in epoch time for TTL

    const command = new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            connectionId: event.requestContext.connectionId,
            sessionId: event.queryStringParameters['sesssionId'],
            ttl: ttlTime
        }
    });
    
    try {
        await docClient.send(command);
        return { statusCode: 200, body: 'Connected.' };
    } catch (err) {
        return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
    }
};