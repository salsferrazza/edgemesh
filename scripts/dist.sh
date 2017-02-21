#!/bin/bash
rimraf dist/edgemesh.client.min.js
rimraf dist/edgemesh.hub.min.js
rimraf dist/edgemesh.worker.min.js

cp ../edgemesh-client/dist/edgemesh.client.min.js ./dist
cp ../edgemesh-hub/dist/edgemesh.hub.min.js ./dist
cp ../edgemesh-worker/dist/edgemesh.worker.min.js ./dist
