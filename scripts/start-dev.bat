@echo off
REM Record Repo - Development Startup Script (Windows)
echo 🚀 Starting Record Repo Development Environment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

REM Start infrastructure services
echo 📦 Starting infrastructure services (PostgreSQL, Redis)...
docker-compose up -d postgres redis

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

REM Start backend
echo 🔧 Starting backend server...
cd backend
call npm install
call npx prisma generate
call npx prisma migrate dev --name init
start "Backend" cmd /k "npm run start:dev"

REM Start frontend
echo 🎨 Starting frontend server...
cd ..\frontend
call npm install
start "Frontend" cmd /k "npm run dev"

echo ✅ Development environment started!
echo 📱 Frontend: http://localhost:4040
echo 🔧 Backend: http://localhost:5050
echo 📊 Database: localhost:5432
echo 🗄️ Redis: localhost:6379
echo.
echo Press any key to stop all services
pause >nul

REM Cleanup
echo 🧹 Stopping services...
docker-compose down
echo ✅ All services stopped.

