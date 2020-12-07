#! /bin/bash
timestamp=$(date +%s)
unamestr=$(uname)
case $unamestr in
"Darwin" | "FreeBSD")
sed -i '' "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml;;
"Linux")
sed -i "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml;;
*)
sed -i "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml;;
esac
cd ../lex-web-ui
npm run build
npm run build-dist
cd .. 
make
cd build
make custom-resources.zip
cd ..
cd dist
make

