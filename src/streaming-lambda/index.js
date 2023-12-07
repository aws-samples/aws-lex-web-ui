const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

exports.handler = async event => {
    console.log("Received event: " + JSON.stringify(event));
    const ttlTime = Date.now() / 1000 + 86400; //One day later in epoch time for TTL

    const putParams = {
        TableName: process.env.TABLE_NAME,
        Item: {
            connectionId: event.requestContext.connectionId,
            sessionId: event.queryStringParameters.sessionId,
            ttl: ttlTime
        }
    };

    try {
        await ddb.put(putParams).promise();
    } catch (err) {
        return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
    }

    return { statusCode: 200, body: 'Connected.' };
};