@echo off
echo 🚀 Starting AllWebsite Development Environment...

echo 🔧 Starting Backend on port 5050...
cd backend
start "Backend" cmd /k "npm run start:dev"

echo 🎨 Starting Frontend on port 4040...
cd ..
start "Frontend" cmd /k "npm run dev"

echo ✅ Development environment started!
echo 📱 Frontend: http://localhost:4040
echo 🔧 Backend: http://localhost:5050
echo.
echo Press any key to continue...
pause >nul
