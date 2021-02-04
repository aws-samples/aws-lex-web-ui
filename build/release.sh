#! /bin/bash
timestamp=$(date +%s)
unamestr=$(uname)
export VERSION=v$(node -p "require('../package.json').version")
echo version is "$VERSION"
case $unamestr in
"Darwin" | "FreeBSD")
sed -i '' -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
../templates/master.yaml;

sed -i '' -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
../templates/master-pipeline.yaml;;

"Linux")
sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
../templates/master.yaml;

sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
../templates/master-pipeline.yaml;;

*)
sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
../templates/master.yaml;

sed -i -e "s/(v.*)/($VERSION)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$VERSION.zip/g" \
-e "s/src-.*zip/src-$VERSION.zip/g" \
../templates/master-pipeline.yaml;;

esac
cd ../lex-web-ui
npm run build
npm run build-dist
cd .. 
make
cd build
make "custom-resources-$VERSION.zip"
cd ..
cd dist
make

