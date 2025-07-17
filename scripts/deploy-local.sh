#!/bin/bash
echo "🐳 Building and running Docker container..."
npm run docker:build
npm run docker:run