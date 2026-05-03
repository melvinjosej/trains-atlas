#!/bin/bash
# 🚀 Trains Atlas App Deployment Script
# Exit immediately if any command fails
set -e

echo "=================================================="
echo "🚄 1. COMPILING THE REACT IPAD WEB APP..."
echo "=================================================="
npm run build

echo ""
echo "=================================================="
echo "📂 2. PUBLISHING STATIC CONTENT TO GOOGLE x20..."
echo "=================================================="
X20_DIR="/google/data/rw/users/me/melvinp/www/trains-atlas"

echo "Creating target x20 folder at: $X20_DIR"
mkdir -p "$X20_DIR"

echo "Clearing old files..."
rm -rf "${X20_DIR:?}"/*

echo "Copying fresh optimized bundle to x20..."
cp -r dist/* "$X20_DIR/"

echo ""
echo "=================================================="
echo "🎉 DEPLOYMENT COMPLETE PERFECTLY!"
echo "=================================================="
echo "Your interactive iPad Trains Atlas app is now live!"
echo "👉 Open this corporate URL on your iPad:"
echo "https://melvinp.users.x20web.corp.google.com/www/trains-atlas/index.html"
echo "=================================================="
