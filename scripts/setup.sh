#!/bin/bash
echo "🚀 Setting up development environment..."
npm install
npm run format
npm run lint:fix
echo "✅ Setup complete!"