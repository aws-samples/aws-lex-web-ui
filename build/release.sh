#! /bin/bash
# Release script - builds all artifacts for a new release
# Optimized to avoid duplicate builds across Makefiles

set -e

timestamp=$(date +%s)
unamestr=$(uname)
export VERSION=v$(node -p "require('../package.json').version")
echo "version is $VERSION"

# Step 1: Update version references in master.yaml template
case $unamestr in
"Darwin" | "FreeBSD")
sed -i '' -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
../templates/master.yaml;;

"Linux")
sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/streaming-lambda-$VERSION.zip/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/qbusiness-lambda-.*zip/qbusiness-lambda-$VERSION.zip/g" \
../templates/master.yaml;;

*)
sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/streaming-lambda-$VERSION.zip/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/qbusiness-lambda-.*zip/qbusiness-lambda-$VERSION.zip/g" \
../templates/master.yaml;;

esac

# Step 2: Build lex-web-ui (app + library bundles)
cd ../lex-web-ui
echo "[INFO] Building lex-web-ui standalone app"
npm run build
echo "[INFO] Building lex-web-ui library bundles (dev + prod)"
npm run build-dist
cd ..

# Step 3: Build the loader (dev + prod)
echo "[INFO] Building loader (dev)"
npm run build-dev
echo "[INFO] Building loader (prod)"
npm run build-prod

# Step 4: Copy bundle files and dependencies to dist/
echo "[INFO] Copying assets to dist/"
node build/copy-assets.js

# Step 5: Build lambda zip files
cd build
echo "[INFO] Building lambda zip files"
make "custom-resources-$VERSION.zip"
make "initiate-chat-lambda-$VERSION.zip"
make "streaming-lambda-$VERSION.zip"
make "qbusiness-lambda-$VERSION.zip"
cd ..
