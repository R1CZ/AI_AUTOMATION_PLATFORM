# 🐳 Complete Docker Installation & Setup Guide

## 📋 Table of Contents
1. [Install Docker](#1-install-docker)
2. [Install Docker Compose](#2-install-docker-compose)
3. [Clone the Project](#3-clone-the-project)
4. [Configure Environment](#4-configure-environment)
5. [Build and Start Services](#5-build-and-start-services)
6. [Verify Installation](#6-verify-installation)
7. [Access the Application](#7-access-the-application)
8. [Common Commands](#8-common-commands)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Install Docker

### 🐧 Ubuntu/Debian/Linux

```bash
# Step 1: Update package index
sudo apt-get update

# Step 2: Install prerequisites
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Step 3: Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Step 4: Set up the stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 5: Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Step 6: Verify Docker is installed
docker --version
# Expected output: Docker version 24.x.x, build xxxxx

# Step 7: Add your user to docker group (optional, avoids sudo)
sudo usermod -aG docker $USER
newgrp docker

# Step 8: Test Docker works
docker run hello-world
# Expected: "Hello from Docker!" message
```

### 🍎 macOS

```bash
# Method 1: Using Homebrew (Recommended)
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker
brew install docker docker-compose

# Method 2: Download Docker Desktop
# 1. Go to https://www.docker.com/products/docker-desktop/
# 2. Download "Docker Desktop for Mac"
# 3. Open the .dmg file
# 4. Drag Docker to Applications folder
# 5. Launch Docker Desktop from Applications
# 6. Follow the setup wizard

# Verify installation
docker --version
docker compose version
```

### 🪟 Windows

```bash
# Method 1: Using WSL2 (Recommended)
# 1. Install WSL2
# Open PowerShell as Administrator
wsl --install

# 2. Restart your computer

# 3. Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop/
# Run the installer
# Follow the setup wizard
# Make sure "Use WSL 2 instead of Hyper-V" is checked

# 4. Start Docker Desktop
# Launch Docker Desktop from Start Menu
# Wait for it to start (green icon in system tray)

# Method 2: Direct Installation
# 1. Download Docker Desktop for Windows
# 2. Run Docker Desktop Installer.exe
# 3. Follow the installation wizard
# 4. Restart computer when prompted
# 5. Launch Docker Desktop

# Verify in PowerShell or Command Prompt
docker --version
docker compose version
```

---

## 2. Install Docker Compose

Docker Compose is usually included with Docker Desktop. If not:

### Linux
```bash
# Install Docker Compose Plugin
sudo apt-get install docker-compose-plugin

# Or install standalone version
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker compose version
# Expected: Docker Compose version v2.x.x
```

### macOS & Windows
Docker Compose is included with Docker Desktop. Just verify:
```bash
docker compose version
```

---

## 3. Clone the Project

```bash
# Step 1: Navigate to where you want to install
cd ~  # or cd /path/to/your/projects

# Step 2: Clone the repository
git clone https://github.com/yourusername/autoflow-ai.git

# Step 3: Navigate into the project
cd autoflow-ai

# Step 4: Verify you're in the right directory
ls -la
# You should see: docker-compose.yml, Dockerfile, src/, backend/, etc.
```

**If you don't have Git installed:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# macOS
brew install git

# Windows
# Download from: https://git-scm.com/download/win
```

---

## 4. Configure Environment

### Step 1: Create Backend Environment File

```bash
# Copy the example file
cp .env.example .env

# Open it in a text editor
nano .env  # or use: code .env, vim .env, etc.
```

**Edit the following values in `.env`:**

```bash
# ===========================================
# REQUIRED: Change these values!
# ===========================================

# Database Password (CHANGE THIS!)
DB_PASSWORD=your_strong_password_here_123

# JWT Secrets (Generate with: openssl rand -base64 32)
JWT_SECRET=generate_a_random_32_character_string_here
JWT_REFRESH_SECRET=generate_another_random_32_character_string_here

# Webhook Secret (Generate with: openssl rand -hex 32)
WEBHOOK_SECRET=generate_a_random_hex_string_here

# ===========================================
# OPTIONAL: Add these if you have them
# ===========================================

# OpenAI API Key (for AI features)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# OAuth Credentials (for social login)
# Leave empty if not using
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

**Generate secure secrets:**
```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate JWT_REFRESH_SECRET
openssl rand -base64 32

# Generate WEBHOOK_SECRET
openssl rand -hex 32

# Copy each output and paste into .env file
```

**Save and exit:**
- In nano: Press `Ctrl+X`, then `Y`, then `Enter`
- In vim: Press `Esc`, type `:wq`, press `Enter`

### Step 2: Create Frontend Environment File

```bash
# Copy the example file
cp .env.local.example .env.local

# Open it
nano .env.local
```

**Edit the file:**
```bash
# Frontend API URL
# For local development, use:
VITE_API_URL=http://localhost:3001

# For production, use your domain:
# VITE_API_URL=https://api.yourdomain.com
```

**Save and exit.**

### Step 3: Verify Environment Files

```bash
# Check both files exist
ls -la .env .env.local

# Check .env has your changes
cat .env | grep -E "(DB_PASSWORD|JWT_SECRET|WEBHOOK_SECRET)"
# Should show your configured values (not the example placeholders)
```

---

## 5. Build and Start Services

### Step 1: Pull Required Docker Images

```bash
# This downloads all necessary Docker images
# First time may take 5-10 minutes depending on your internet speed
docker compose pull
```

**What this downloads:**
- PostgreSQL 16 database
- Redis 7 cache
- n8n workflow engine
- Node.js 20 (for building frontend)
- Nginx (for serving frontend)
- Python 3.11 (for AI service)
- PHP 8.3 (for legacy service)

### Step 2: Build Custom Images

```bash
# Build the application images
# First time may take 10-15 minutes
docker compose build
```

**What this builds:**
- Frontend React application
- Backend Node.js API
- Python FastAPI service
- PHP service

### Step 3: Start All Services

```bash
# Start all services in detached mode (background)
docker compose up -d

# Watch the logs to see services starting
docker compose logs -f
```

**Expected output:**
```
[+] Running 7/7
 ✔ Container autoflow-postgres       Started
 ✔ Container autoflow-redis          Started
 ✔ Container autoflow-backend        Started
 ✔ Container autoflow-python-service Started
 ✔ Container autoflow-php-service    Started
 ✔ Container autoflow-n8n            Started
 ✔ Container autoflow-frontend       Started
```

**To stop watching logs:** Press `Ctrl+C`

### Step 4: Wait for Services to be Ready

```bash
# Check if all containers are running
docker compose ps
```

**Expected output:**
```
NAME                    STATUS          PORTS
autoflow-postgres       Up (healthy)    0.0.0.0:5432->5432/tcp
autoflow-redis          Up              0.0.0.0:6379->6379/tcp
autoflow-backend        Up              0.0.0.0:3001->3001/tcp
autoflow-python-service Up              0.0.0.0:8001->8001/tcp
autoflow-php-service    Up              0.0.0.0:8080->80/tcp
autoflow-n8n            Up              0.0.0.0:5678->5678/tcp
autoflow-frontend       Up              0.0.0.0:3000->80/tcp
```

**All services should show "Up" status.**

**Wait for PostgreSQL to be healthy:**
```bash
# Check PostgreSQL health
docker compose ps postgres
# Should show "Up (healthy)" after 10-20 seconds
```

---

## 6. Verify Installation

### Test 1: Check Backend API Health

```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-...",
  "services": {
    "api": "healthy",
    "database": "healthy",
    "redis": "healthy"
  }
}
```

### Test 2: Check Python Service Health

```bash
curl http://localhost:8001/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "service": "python-service",
  "version": "1.0.0",
  "ai_provider": "openai",
  "timestamp": "2024-..."
}
```

### Test 3: Check PHP Service Health

```bash
curl http://localhost:8080/api/php/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "service": "php-service",
  "version": "1.0.0",
  "php_version": "8.3.x",
  "environment": "production",
  "timestamp": "2024-..."
}
```

### Test 4: Check Database Connection

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U autoflow -d autoflow -c "SELECT 1"
```

**Expected output:**
```
 ?column? 
----------
        1
(1 row)
```

### Test 5: Check Redis Connection

```bash
# Connect to Redis
docker compose exec redis redis-cli ping
```

**Expected output:**
```
PONG
```

### Test 6: Check Database Tables

```bash
# List all tables
docker compose exec postgres psql -U autoflow -d autoflow -c "\dt"
```

**Expected output:**
```
           List of relations
 Schema |      Name       | Type  |  Owner   
--------+-----------------+-------+----------
 public | api_keys        | table | autoflow
 public | audit_logs      | table | autoflow
 public | executions      | table | autoflow
 public | execution_steps | table | autoflow
 public | integrations    | table | autoflow
 public | notifications   | table | autoflow
 public | oauth_connections| table | autoflow
 public | refresh_tokens  | table | autoflow
 public | users           | table | autoflow
 public | webhook_events  | table | autoflow
 public | webhooks        | table | autoflow
 public | workflow_steps  | table | autoflow
 public | workflows       | table | autoflow
(13 rows)
```

---

## 7. Access the Application

### Frontend (Main Application)
```
URL: http://localhost:3000
```
- Open in your browser
- You should see the AutoFlow AI landing page
- Click "Get Started" or "Sign In"

### Backend API
```
URL: http://localhost:3001
API Docs: http://localhost:3001/api/health
```

### Python Service
```
URL: http://localhost:8001
API Docs: http://localhost:8001/docs (Swagger UI)
```

### PHP Service
```
URL: http://localhost:8080
```

### n8n Workflow Engine
```
URL: http://localhost:5678
Username: admin (from .env N8N_USER)
Password: admin (from .env N8N_PASSWORD)
```

### Database (Direct Access)
```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U autoflow -d autoflow

# Or from your machine (if port is exposed)
psql -h localhost -p 5432 -U autoflow -d autoflow
```

---

## 8. Common Commands

### Start Services
```bash
# Start all services
docker compose up -d

# Start specific service
docker compose up -d backend

# Start with build
docker compose up -d --build
```

### Stop Services
```bash
# Stop all services
docker compose down

# Stop and remove volumes (WARNING: deletes database!)
docker compose down -v

# Stop specific service
docker compose stop backend
```

### View Logs
```bash
# View all logs
docker compose logs

# View logs for specific service
docker compose logs backend
docker compose logs frontend
docker compose logs postgres

# Follow logs in real-time
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100 backend
```

### Restart Services
```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart backend

# Restart and rebuild
docker compose up -d --build --force-recreate
```

### Execute Commands in Containers
```bash
# Run command in backend container
docker compose exec backend npm run test

# Run command in Python container
docker compose exec python-service python --version

# Access backend shell
docker compose exec backend sh

# Access PostgreSQL
docker compose exec postgres psql -U autoflow -d autoflow
```

### Check Resource Usage
```bash
# View container stats
docker stats

# View specific container stats
docker stats autoflow-backend-1
```

### Clean Up
```bash
# Remove unused images
docker image prune -a

# Remove all stopped containers
docker container prune

# Remove unused volumes
docker volume prune

# Complete cleanup (WARNING: deletes all data!)
docker system prune -a --volumes
```

---

## 9. Troubleshooting

### Problem: Port Already in Use

**Error:**
```
Error starting userland proxy: listen tcp4 0.0.0.0:3001: bind: address already in use
```

**Solution:**
```bash
# Find what's using the port
sudo lsof -i :3001

# Kill the process
sudo kill -9 <PID>

# Or change the port in docker-compose.yml
# Change "3001:3001" to "3002:3001"
```

### Problem: Database Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
```bash
# Check if PostgreSQL is running
docker compose ps postgres

# Wait for it to be healthy (takes 10-20 seconds)
docker compose logs postgres

# Restart PostgreSQL
docker compose restart postgres

# Check database credentials in .env
cat .env | grep DATABASE_URL
```

### Problem: Services Won't Start

**Error:**
```
Container autoflow-backend-1  Exit 1
```

**Solution:**
```bash
# Check logs for errors
docker compose logs backend

# Common issues:
# 1. Missing .env file
ls -la .env

# 2. Invalid .env values
cat .env | grep -E "(DB_PASSWORD|JWT_SECRET)"

# 3. Port conflicts
docker compose ps

# 4. Insufficient memory
docker stats
```

### Problem: Frontend Can't Connect to Backend

**Error:**
```
Cannot connect to server. Please ensure the backend is running.
```

**Solution:**
```bash
# Check VITE_API_URL in .env.local
cat .env.local

# Should be: VITE_API_URL=http://localhost:3001

# Rebuild frontend
docker compose up -d --build frontend

# Check backend is running
curl http://localhost:3001/api/health
```

### Problem: Out of Memory

**Error:**
```
Error response from daemon: Cannot start container: OCI runtime create failed
```

**Solution:**
```bash
# Check Docker memory limit
docker info | grep Memory

# Increase Docker memory (Docker Desktop):
# 1. Open Docker Desktop
# 2. Go to Settings > Resources
# 3. Increase Memory to 8GB or more
# 4. Click "Apply & Restart"

# Or stop some services
docker compose stop n8n
```

### Problem: Permission Denied

**Error:**
```
permission denied while trying to connect to the Docker daemon socket
```

**Solution:**
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker

# Verify
groups | grep docker
```

### Problem: Build Failed

**Error:**
```
ERROR: failed to solve: failed to compute cache key
```

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache

# Check Docker disk space
docker system df
```

### Problem: Slow Performance

**Solution:**
```bash
# Check resource usage
docker stats

# Allocate more resources to Docker (Docker Desktop):
# Settings > Resources > Increase CPU and Memory

# Disable unnecessary services
docker compose stop n8n php-service
```

---

## 10. First Time Setup

### Create Your First User

```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

**Expected response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "usr_xxx",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "USER"
    },
    "access_token": "eyJhbGc...",
    "refresh_token": "dGhpcyBp..."
  }
}
```

### Login

```bash
# Login with your credentials
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

### Test the Frontend

1. Open browser: http://localhost:3000
2. Click "Sign In"
3. Enter your email and password
4. You should see the dashboard

---

## 11. Production Deployment

### Update for Production

```bash
# 1. Update .env for production
nano .env

# Change these:
APP_ENV=production
CORS_ORIGIN=https://yourdomain.com
DATABASE_URL=postgresql://user:pass@your-db-host:5432/autoflow

# 2. Update .env.local
nano .env.local

# Change this:
VITE_API_URL=https://api.yourdomain.com

# 3. Rebuild and restart
docker compose down
docker compose up -d --build
```

### SSL/HTTPS Setup

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Backup Database

```bash
# Create backup
docker compose exec postgres pg_dump -U autoflow autoflow > backup_$(date +%Y%m%d).sql

# Restore backup
cat backup_20240101.sql | docker compose exec -T postgres psql -U autoflow autoflow
```

---

## 12. Quick Reference

### All Service URLs
```
Frontend:    http://localhost:3000
Backend API: http://localhost:3001
Python:      http://localhost:8001
PHP:         http://localhost:8080
n8n:         http://localhost:5678
PostgreSQL:  localhost:5432
Redis:       localhost:6379
```

### Essential Commands
```bash
# Start everything
docker compose up -d

# Stop everything
docker compose down

# View logs
docker compose logs -f

# Check status
docker compose ps

# Restart
docker compose restart

# Rebuild
docker compose up -d --build
```

### Health Checks
```bash
curl http://localhost:3001/api/health
curl http://localhost:8001/api/health
curl http://localhost:8080/api/php/health
```

---

## ✅ Installation Complete!

If all tests pass and you can access http://localhost:3000, your AutoFlow AI platform is ready to use!

**Next steps:**
1. Create your user account
2. Explore the dashboard
3. Create your first workflow
4. Test webhooks
5. Connect integrations

**Need help?**
- Check `README.md` for project overview
- Check `USAGE_GUIDE.md` for how to use the platform
- Check `docs/` folder for detailed documentation
- View logs: `docker compose logs -f`

**Congratulations! 🎉 Your AutoFlow AI platform is now running!**
