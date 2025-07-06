#!/bin/bash

# Automated React Portfolio Deployment Script
# This script builds the React app and copies all necessary files to root directory

echo "🚀 Starting automated deployment..."

# Step 1: Build the React application
echo "📦 Building React application..."
NODE_OPTIONS="--openssl-legacy-provider" npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Exiting..."
    exit 1
fi

echo "✅ Build completed successfully!"

# Step 2: Copy built files to root
echo "📁 Copying built files..."
cp build/index.html ./index.html
cp -r build/static ./static
cp build/service-worker.js ./service-worker.js
cp build/precache-manifest.*.js ./
cp build/asset-manifest.json ./asset-manifest.json

echo "✅ Built files copied!"

# Step 3: Copy assets from public directory
echo "📁 Copying assets from public directory..."
cp -r public/css ./css
cp -r public/js ./js
cp public/resumeData.json ./resumeData.json
cp -r public/images ./images
cp public/manifest.json ./manifest.json
cp public/favicon.ico ./favicon.ico

echo "✅ Assets copied!"

# Step 4: Clean up build directory
echo "🧹 Cleaning up..."
rm -rf build/

echo "✅ Cleanup completed!"

# Step 5: Optional - Git operations
read -p "🔄 Do you want to commit and push to GitHub? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Adding files to git..."
    git add -A
    
    echo "💾 Committing changes..."
    git commit -m "Deploy React portfolio - $(date '+%Y-%m-%d %H:%M:%S')"
    
    echo "🚀 Pushing to GitHub..."
    git push origin master
    
    echo "✅ Deployment complete! Your site will be live in a few minutes."
    echo "🌐 Visit: https://kianooshsoleimani.github.io"
else
    echo "✅ Files are ready! You can manually commit and push when ready."
fi

echo "🎉 Deployment process finished!" 