#!/bin/bash

# Wrapper script to generate a static build for Hostinger

set -e

if [ -f "scripts/build-static.sh" ]; then
  chmod +x scripts/build-static.sh
  bash scripts/build-static.sh
else
  echo "❌ scripts/build-static.sh not found" >&2
  exit 1
fi
