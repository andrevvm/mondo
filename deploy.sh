#!/bin/bash

# Deploy script for Middleman site to GitHub Pages
# This script builds the site and pushes it to the gh-pages branch

set -e # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes. Please commit or stash them first."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📋 Current branch: $CURRENT_BRANCH"

# Build the site
echo "🔨 Building Middleman site..."
bundle exec middleman build

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Error: Build directory not found. Make sure the build was successful."
    exit 1
fi

# Create a temporary directory for the build
TEMP_DIR=$(mktemp -d)
echo "📁 Using temporary directory: $TEMP_DIR"

# Copy build files to temp directory
cp -R build/* "$TEMP_DIR/"

# Switch to gh-pages branch (create if it doesn't exist)
echo "🌿 Switching to gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
else
    echo "Creating new gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
fi

# Remove all files except .git
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy build files from temp directory
cp -R "$TEMP_DIR"/* .

# Add a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Add all files and commit
echo "📝 Committing changes..."
git add .

if git diff --staged --quiet; then
    echo "ℹ️  No changes to deploy"
else
    git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Push to gh-pages branch
    echo "📤 Pushing to gh-pages branch..."
    git push origin gh-pages
    
    echo "✅ Successfully deployed to GitHub Pages!"
fi

# Switch back to original branch
echo "🔄 Switching back to $CURRENT_BRANCH branch..."
git checkout "$CURRENT_BRANCH"

# Clean up temporary directory
rm -rf "$TEMP_DIR"

echo "🎉 Deployment complete!"
echo "Your site should be available at: https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/').github.io/$(basename $(git config --get remote.origin.url) .git)/" 