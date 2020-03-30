#!/usr/bin/env bash
# utility to manually bootstrap a bucket with source files
# this is intended for testing - use the Makefile for prod
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
rm -f out/src.zip
# no longer removes custom-resources.zip - this is created in build using ./release.sh as a required step

pushd .
cd ..
git ls-files | xargs zip -u build/out/src.zip
popd
aws s3 cp --acl public-read out/src.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/src.zip"

aws s3 cp --acl public-read out/custom-resources.zip \
  "s3://${BOOTSTRAP_BUCKET_PATH}/custom-resources.zip"

aws s3 sync --acl public-read --exclude "*" --include "*.yaml" \
  ../templates "s3://${BOOTSTRAP_BUCKET_PATH}/templates/"

echo "[INFO] master template: https://s3.amazonaws.com/${BOOTSTRAP_BUCKET_PATH}/templates/master.yaml"
