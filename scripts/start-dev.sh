#!/bin/bash

# Record Repo - Development Startup Script
echo "🚀 Starting Record Repo Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start infrastructure services
echo "📦 Starting infrastructure services (PostgreSQL, Redis)..."
docker-compose up -d postgres redis

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Start backend
echo "🔧 Starting backend server..."
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev &
BACKEND_PID=$!

# Start frontend
echo "🎨 Starting frontend server..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "✅ Development environment started!"
echo "📱 Frontend: http://localhost:4040"
echo "🔧 Backend: http://localhost:5050"
echo "📊 Database: localhost:5432"
echo "🗄️ Redis: localhost:6379"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait

# Cleanup
echo "🧹 Stopping services..."
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
docker-compose down
echo "✅ All services stopped."

