#!/bin/bash
npm run lint
npm run test
npm run clean
# Build injection
NODE_ENV=production rollup -c
# Copy CLI
cp src/bin.js dist/bin.js
# Copy service worker
uglifyjs src/sw.js -o dist/edgemesh.sw.min.js
