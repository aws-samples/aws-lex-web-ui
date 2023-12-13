import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

console.log('Loading function');
const s3 = new S3();

export const handler = async (event) => {
  const bucket = process.env['S3_BUCKET']
  console.log(event["queryStringParameters"]['filename']);
  
  // Instantiate the GetObject command,
  // a.k.a. specific the bucket and key
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: event["queryStringParameters"]['filename'],
  });

  // await the signed URL and return it
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  
  let response = {
        statusCode: 200,
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS",
          "Access-Control-Allow-Methods" : "GET, OPTIONS",
          "Access-Control-Allow-Headers" : "*"
        },
        body: JSON.stringify({ url: url})
    };
    console.log("response: " + JSON.stringify(response))
    return response;
}