#!/usr/bin/env bash
set -e


# Fix up the working directory for consistent script behavior
cd "$(dirname "$0")/.."


# Enter your CloudFront distribution id here to deploy to its S3 bucket.
# cloudfront_id = "" 

# Pick the right S3 bucket based on the above distribution's origin config
webapp_bucket="$(aws cloudfront get-distribution-config --id $cloudfront_id --query 'DistributionConfig.Origins.Items[*].DomainName' --output text)"
webapp_bucket="${webapp_bucket/.s3.us-east-1.amazonaws.com/}"


# Upload the contents of the dist to S3 and invalidate the CloudFront cache
aws s3 sync dist/ s3://$webapp_bucket/
aws cloudfront create-invalidation --distribution-id $cloudfront_id --paths '/*'
