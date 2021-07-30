#!/usr/bin/env bash
set -e


# Fix up the working directory for consistent script behavior
cd "$(dirname "$0")/.."


# Trash any prior build artifacts
rm -rf dist


# Build the Lex Web UI Vue application
pushd lex-web-ui
npm run build:lib-prod
popd

# Build the supporting code (e.g. the loader) and pull everything to the final dist folder
npm run build-dev
