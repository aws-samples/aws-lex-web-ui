#! /bin/bash

cd ../lex-web-ui
npm run build
npm run build-dist
cd .. 
make
cd dist
make

