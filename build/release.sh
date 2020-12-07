#! /bin/bash
timestamp=$(date +%s)
sed -i '' "s/Timestamp:.*/Timestamp: $timestamp/g" ../templates/master.yaml
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

