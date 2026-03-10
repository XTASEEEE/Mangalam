#!/bin/bash

# Mangalam Caterers - Vercel Deployment Script
# This script automates the Vercel CLI deployment process

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  Mangalam Caterers - Vercel Deployment Script            ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        echo "Please run manually: npm install -g vercel"
        exit 1
    fi
    echo "✅ Vercel CLI installed successfully"
else
    echo "✅ Vercel CLI found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Building the application..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd /app/frontend

# Build the app
yarn build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Deploying to Vercel..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  You may be asked to login to Vercel if not already logged in"
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  IMPORTANT: Set Environment Variable"
echo ""
echo "Run this command to add the backend URL:"
echo ""
echo "  vercel env add REACT_APP_BACKEND_URL production"
echo ""
echo "When prompted, enter:"
echo "  https://feast-mangalam.preview.emergentagent.com"
echo ""
echo "Then redeploy with:"
echo "  vercel --prod"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Post-Deployment Checklist:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "[ ] Visit your Vercel URL"
echo "[ ] Test all pages (/, /about, /services, etc.)"
echo "[ ] Verify images load"
echo "[ ] Test contact form display"
echo "[ ] Check WhatsApp button"
echo "[ ] Test page refresh (shouldn't 404)"
echo ""
echo "Happy deploying! 🚀"
