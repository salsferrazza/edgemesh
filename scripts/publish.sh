#!/bin/bash
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# increment package version
node "./scripts/prompts/version-prompt.js"

# add changes, commit and tag
git add .
git commit -m "chore(release): $PACKAGE_VERSION"
git tag -a $PACKAGE_VERSION -m "https://github.com/edgemesh/edgemesh/blob/$BRANCH/CHANGELOG.md"

# Push
git push --follow-tags --force origin $BRANCH

# Publish to npm
npm publish
