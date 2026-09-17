#!/bin/bash

# AutoFlow AI - Quick Setup Script
# This script helps you set up the environment and start the application

echo "🚀 AutoFlow AI - Quick Setup"
echo "=============================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file and set your secrets:"
    echo "   - JWT_SECRET (generate with: openssl rand -base64 32)"
    echo "   - JWT_REFRESH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - WEBHOOK_SECRET (generate with: openssl rand -hex 32)"
    echo "   - OPENAI_API_KEY (optional, get from: https://platform.openai.com/api-keys)"
    echo ""
    read -p "Press Enter after you've configured .env file..."
fi

# Check if .env.local file exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.local.example .env.local
    echo "✅ .env.local file created"
    echo ""
fi

# Generate secure secrets if they're still using defaults
echo "🔐 Checking security..."
if grep -q "your_jwt_secret_key_min_32_chars_here" .env; then
    echo "⚠️  JWT_SECRET is using default value. Generating secure secret..."
    NEW_SECRET=$(openssl rand -base64 32)
    sed -i.bak "s/JWT_SECRET=your_jwt_secret_key_min_32_chars_here/JWT_SECRET=$NEW_SECRET/" .env
    rm .env.bak
    echo "✅ JWT_SECRET updated"
fi

if grep -q "your_refresh_token_secret_min_32_chars" .env; then
    echo "⚠️  JWT_REFRESH_SECRET is using default value. Generating secure secret..."
    NEW_SECRET=$(openssl rand -base64 32)
    sed -i.bak "s/JWT_REFRESH_SECRET=your_refresh_token_secret_min_32_chars/JWT_REFRESH_SECRET=$NEW_SECRET/" .env
    rm .env.bak
    echo "✅ JWT_REFRESH_SECRET updated"
fi

if grep -q "your_webhook_hmac_secret_here" .env; then
    echo "⚠️  WEBHOOK_SECRET is using default value. Generating secure secret..."
    NEW_SECRET=$(openssl rand -hex 32)
    sed -i.bak "s/WEBHOOK_SECRET=your_webhook_hmac_secret_here/WEBHOOK_SECRET=$NEW_SECRET/" .env
    rm .env.bak
    echo "✅ WEBHOOK_SECRET updated"
fi

echo ""
echo "🔨 Building and starting services..."
echo ""

# Stop any existing containers
docker compose down

# Pull latest images
echo "📥 Pulling latest images..."
docker compose pull

# Build services
echo "🔨 Building services..."
docker compose build

# Start services
echo "🚀 Starting services..."
docker compose up -d

echo ""
echo "✅ Services started!"
echo ""
echo "📊 Service Status:"
docker compose ps

echo ""
echo "🌐 Access the application:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   Python:      http://localhost:8001"
echo "   PHP:         http://localhost:8080"
echo "   n8n:         http://localhost:5678"
echo ""
echo "📝 View logs:"
echo "   docker compose logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker compose down"
echo ""
echo "🎉 Setup complete! Open http://localhost:3000 in your browser."
