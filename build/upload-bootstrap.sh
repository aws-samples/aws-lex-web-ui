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
aws s3 cp out/src-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/src-$version.zip"

aws s3 cp out/initiate-chat-lambda-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/initiate-chat-lambda-$version.zip"

aws s3 cp out/streaming-lambda-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/streaming-lambda-$version.zip"

aws s3 cp out/qbusiness-lambda-$version.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/qbusiness-lambda-$version.zip"

aws s3 sync --exclude "*" --include "*.yaml" \
  ../templates "s3://${BOOTSTRAP_BUCKET_PATH}/templates/"

aws s3 cp ..templates/layers.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/layers.zip"

echo "[INFO] master template: https://s3.amazonaws.com/${BOOTSTRAP_BUCKET_PATH}/templates/master.yaml"
