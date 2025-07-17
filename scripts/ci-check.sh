#!/bin/bash
echo "🔍 Running CI checks locally..."
npm run lint
npm run format:check
npm run build
echo "✅ All checks passed!"