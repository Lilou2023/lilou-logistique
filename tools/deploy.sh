#!/bin/bash
set -e

# Checkout deployment branch
git checkout hostinger-deploy

# Merge main branch
git merge main --no-edit

# Install dependencies
npm install

# Build for Hostinger
npm run build:hostinger

# Copy export files to repo root
cp -r out/* .

# Commit changes
git add .
if ! git diff --cached --quiet; then
  git commit -m "chore: update hostinger deployment"
fi

# Push to remote
git push origin hostinger-deploy

# Return to main branch
git checkout main
