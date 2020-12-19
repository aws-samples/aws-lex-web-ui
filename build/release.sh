#! /bin/bash
timestamp=$(date +%s)
unamestr=$(uname)
export version=v$(node -p "require('../package.json').version")
echo version is $version
case $unamestr in
"Darwin" | "FreeBSD")
sed -i '' "s/(v.*)/($version)/g" ../templates/master.yaml;
sed -i '' "s/(v.*)/($version)/g" ../templates/master-pipeline.yaml;
sed -i '' "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml;
sed -i '' "s/custom-resources-.*zip/custom-resources-$version.zip/g" ../templates/master.yaml;
sed -i '' "s/src-.*zip/src-$version.zip/g" ../templates/master.yaml;
sed -i '' "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master-pipeline.yaml;
sed -i '' "s/custom-resources-.*zip/custom-resources-$version.zip/g" ../templates/master-pipeline.yaml;
sed -i '' "s/src-.*zip/src-$version.zip/g" ../templates/master-pipeline.yaml;;
"Linux")
sed -i "s/(v.*)/($version)/g" ../templates/master.yaml;
sed -i "s/(v.*)/($version)/g" ../templates/master-pipeline.yaml;
sed -i "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml;
sed -i "s/custom-resources-.*zip/custom-resources-$version.zip/g" ../templates/master.yaml;
sed -i "s/src-.*zip/src-$version.zip/g" ../templates/master.yaml;
sed -i "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master-pipeline.yaml;
sed -i "s/custom-resources-.*zip/custom-resources-$version.zip/g" ../templates/master-pipeline.yaml;
sed -i "s/src-.*zip/src-$version.zip/g" ../templates/master-pipeline.yaml;;
*)
sed -i "s/(v.*)/($version)/g" ../templates/master.yaml;
sed -i "s/(v.*)/($version)/g" ../templates/master-pipeline.yaml;
sed -i "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml;
sed -i "s/custom-resources-.*zip/custom-resources-$version.zip/g" ../templates/master.yaml;
sed -i "s/src-.*zip/src-$version.zip/g" ../templates/master.yaml;
sed -i "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master-pipeline.yaml;
sed -i "s/custom-resources-.*zip/custom-resources-$version.zip/g" ../templates/master-pipeline.yaml;
sed -i "s/src-.*zip/src-$version.zip/g" ../templates/master-pipeline.yaml;;
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

