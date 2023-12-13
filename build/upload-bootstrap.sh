#!/usr/bin/env bash
# utility to manually bootstrap a bucket with source files
# this is intended for testing - use the Makefile for prod
export version=v$(node -p "require('../package.json').version")
echo version is $version
BUCKET=${BUCKET:-""}
BOOTSTRAP_BUCKET_PATH="${BUCKET}/artifacts"

[ "$BUCKET" ] || {
  echo "[ERROR] bucket variable is not set"
  exit 1
}

if ! test -d out; then
mkdir out
fi

# assumes that it is running from build dir
rm -f out/src-$version.zip
# no longer removes custom-resources.zip - this is created in build using ./release.sh as a required step

pushd .
cd ..
git ls-files | xargs zip -u build/out/src-$version.zip
popd
aws s3 cp --acl public-read out/src-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/src-$version.zip"

aws s3 cp --acl public-read out/custom-resources-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/custom-resources-$version.zip"

aws s3 cp --acl public-read out/initiate-chat-lambda-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/initiate-chat-lambda-$version.zip"

aws s3 cp --acl public-read out/streaming-lambda-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/streaming-lambda-$version.zip"

aws s3 cp --acl public-read out/upload-lambda-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/upload-lambda-$version.zip"

aws s3 sync --acl public-read --exclude "*" --include "*.yaml" \
  ../templates "s3://${BOOTSTRAP_BUCKET_PATH}/templates/"

echo "[INFO] master template: https://s3.amazonaws.com/${BOOTSTRAP_BUCKET_PATH}/templates/master.yaml"
