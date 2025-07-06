#!/bin/bash

# Helper script to deploy to Hostinger
set -e

# 1. checkout hostinger-deploy
echo "🌿 Switching to hostinger-deploy"
git checkout hostinger-deploy

# 2. merge main into hostinger-deploy
echo "🔄 Merging main"
git merge main --no-edit

# 3. install dependencies
echo "📦 Installing dependencies"
npm install

# 4. build and export for Hostinger
echo "🏗️ Building for Hostinger"
npm run build:hostinger

# 5. copy output files to repository root
echo "📁 Copying build output"
cp -r out/* .

# 6. commit the changes
if ! git diff --quiet --exit-code; then
  git add .
  git commit -m "🚀 Hostinger deployment build"
fi

# 7. push the branch
echo "📤 Pushing hostinger-deploy"
git push origin hostinger-deploy

# 8. return to main
echo "🔙 Returning to main"
git checkout main

