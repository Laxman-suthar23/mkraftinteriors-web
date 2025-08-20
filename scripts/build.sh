#!/bin/bash

echo "🚀 Starting Karni Interiors build process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️  Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npx prisma db seed

echo "🏗️  Building application..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🚀 To start the production server, run:"
echo "   npm start"
echo ""
echo "🛠️  To start development server, run:"
echo "   npm run dev"
