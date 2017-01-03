#!/bin/bash
NODE_ENV=production NODE_PATH=src mocha --compilers js:babel-register
