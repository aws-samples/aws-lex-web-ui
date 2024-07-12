#! /bin/bash
timestamp=$(date +%s)
unamestr=$(uname)
export VERSION=v$(node -p "require('../package.json').version")
echo version is "$VERSION"
case $unamestr in
"Darwin" | "FreeBSD")
sed -i '' -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
../templates/master.yaml;

sed -i '' -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
../templates/master-pipeline.yaml;;

"Linux")
sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/streaming-lambda-$VERSION.zip/g" \
-e "s/qbusiness-lambda-.*zip/qbusiness-lambda-$VERSION.zip/g" \
../templates/master.yaml;

sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/streaming-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/qbusiness-lambda-$VERSION.zip/g" \
../templates/master-pipeline.yaml;;

*)
sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/streaming-lambda-$VERSION.zip/g" \
-e "s/qbusiness-lambda-.*zip/qbusiness-lambda-$VERSION.zip/g" \
../templates/master.yaml;

sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/initiate-chat-lambda-.*zip/initiate-chat-lambda-$VERSION.zip/g" \
-e "s/streaming-lambda-.*zip/streaming-lambda-$VERSION.zip/g" \
-e "s/qbusiness-lambda-.*zip/qbusiness-lambda-$VERSION.zip/g" \
../templates/master-pipeline.yaml;;


esac
cd ../lex-web-ui
npm run build
npm run build-dist
cd .. 
make
cd build
make "initiate-chat-lambda-$VERSION.zip"
make "streaming-lambda-$VERSION.zip"
make "qbusiness-lambda-$VERSION.zip"
cd ..
cd dist
make

