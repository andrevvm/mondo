#!/bin/bash

# Middleman Deployment Script for GitHub Pages
# This script builds your Middleman site and deploys it to GitHub Pages

set -e  # Exit on any error

echo "🏗️  Building Middleman site..."
bundle exec middleman build --clean

echo "📦 Preparing deployment..."

# Store current branch
CURRENT_BRANCH=$(git branch --show-current)

# Stash any uncommitted changes
if ! git diff --quiet; then
    echo "Stashing uncommitted changes..."
    git stash
    STASHED=true
else
    STASHED=false
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Create or switch to gh-pages branch
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "Switching to gh-pages branch..."
    git checkout gh-pages
else
    echo "Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
fi

# Copy build files to root
echo "📋 Copying build files..."
cp -r build/* .

# Clean up build directory from git
rm -rf build

# Add all files and commit
git add .
git commit -m "Deploy: $(date)"

# Push to GitHub
echo "🚀 Deploying to GitHub Pages..."
git push origin gh-pages

# Return to original branch
git checkout "$CURRENT_BRANCH"

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo "Restoring stashed changes..."
    git stash pop
fi

echo "✅ Deployment complete! Your site should be available at your GitHub Pages URL." 