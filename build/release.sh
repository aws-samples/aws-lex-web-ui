#! /bin/bash
timestamp=$(date +%s)
unamestr=$(uname)
export version=v$(node -p "require('../package.json').version")
echo version is $version
case $unamestr in
"Darwin" | "FreeBSD")
sed -i '' -e "s/(v.*)/($version)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$version.zip/g" \
-e "s/src-.*zip/src-$version.zip/g" \
../templates/master.yaml;

sed -i '' -e "s/(v.*)/($version)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$version.zip/g" \
-e "s/src-.*zip/src-$version.zip/g" \
../templates/master-pipeline.yaml;;

"Linux")
sed -i -e "s/(v.*)/($version)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$version.zip/g" \
-e "s/custom-resources-.*zip/custom-resources-$version.zip/g" \
../templates/master.yaml;

sed -i -e "s/(v.*)/($version)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$version.zip/g" \
-e "s/src-.*zip/src-$version.zip/g" \
../templates/master-pipeline.yaml;;

*)
sed -i -e "s/(v.*)/($version)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/src-.*zip/src-$version.zip/g" \
-e "s/custom-resources-.*zip/custom-resources-$version.zip/g" \
../templates/master.yaml;

sed -i -e "s/(v.*)/($version)/g" \
-e "s/Timestamp:.*/Timestamp: $timestamp/g" \
-e "s/custom-resources-.*zip/custom-resources-$version.zip/g" \
-e "s/src-.*zip/src-$version.zip/g" \
../templates/master-pipeline.yaml;;

esac
cd ../lex-web-ui
npm run build
npm run build-dist
cd .. 
make
cd build
make custom-resources-$version.zip
cd ..
cd dist
make

