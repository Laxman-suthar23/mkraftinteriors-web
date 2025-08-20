#!/bin/bash

echo "🚀 Deploying Karni Interiors to production..."

# Set environment to production
export NODE_ENV=production

# Check if required environment variables are set
if [[ -z "$DATABASE_URL" ]]; then
    echo "❌ DATABASE_URL environment variable is required"
    exit 1
fi

if [[ -z "$NEXTAUTH_SECRET" ]]; then
    echo "❌ NEXTAUTH_SECRET environment variable is required"
    exit 1
fi

echo "📦 Installing production dependencies..."
npm ci --only=production

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️  Running database migrations..."
npx prisma migrate deploy

echo "🏗️  Building application..."
npm run build

echo "🧹 Cleaning up development files..."
rm -rf .next/cache

echo "🔄 Restarting application..."
pm2 restart karni-interiors || pm2 start ecosystem.config.js

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running at: $NEXTAUTH_URL"
