#!/bin/bash
npm run lint -- --fix
npm run test
npm run clean
# Build injection
NODE_ENV=production rollup -c
# Copy CLI
cp src/bin.js dist/bin.js
