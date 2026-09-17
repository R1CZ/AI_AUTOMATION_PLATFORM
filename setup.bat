@echo off
REM AutoFlow AI - Quick Setup Script for Windows

echo.
echo ========================================
echo   AutoFlow AI - Quick Setup
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Check if .env file exists
if not exist .env (
    echo [INFO] Creating .env file from template...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo.
    echo [WARNING] IMPORTANT: Please edit .env file and set your secrets:
    echo    - JWT_SECRET
    echo    - JWT_REFRESH_SECRET
    echo    - WEBHOOK_SECRET
    echo    - OPENAI_API_KEY (optional)
    echo.
    echo Press any key after you've configured .env file...
    pause >nul
)

REM Check if .env.local file exists
if not exist .env.local (
    echo [INFO] Creating .env.local file...
    copy .env.local.example .env.local >nul
    echo [OK] .env.local file created
    echo.
)

echo.
echo [INFO] Building and starting services...
echo.

REM Stop any existing containers
docker compose down

REM Pull latest images
echo [INFO] Pulling latest images...
docker compose pull

REM Build services
echo [INFO] Building services...
docker compose build

REM Start services
echo [INFO] Starting services...
docker compose up -d

echo.
echo [OK] Services started!
echo.
echo ========================================
echo   Service Status
echo ========================================
docker compose ps

echo.
echo ========================================
echo   Access the Application
echo ========================================
echo.
echo   Frontend:    http://localhost:3000
echo   Backend API: http://localhost:3001
echo   Python:      http://localhost:8001
echo   PHP:         http://localhost:8080
echo   n8n:         http://localhost:5678
echo.
echo ========================================
echo   Useful Commands
echo ========================================
echo.
echo   View logs:       docker compose logs -f
echo   Stop services:   docker compose down
echo   Restart:         docker compose restart
echo.
echo [DONE] Setup complete! Open http://localhost:3000 in your browser.
echo.
pause
