# 📦 Complete Installation Guide - AutoFlow AI Platform

## 🖥️ System Requirements

### Minimum Requirements
- **CPU**: 2 cores (4 cores recommended)
- **RAM**: 4GB (8GB recommended)
- **Storage**: 10GB free space
- **OS**: Linux (Ubuntu 20.04+), macOS 12+, or Windows 10+ with WSL2

### Recommended for Production
- **CPU**: 4+ cores
- **RAM**: 8-16GB
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 22.04 LTS or similar

---

## 📋 Software Prerequisites

### Option A: Docker Installation (Recommended)

#### 1. Docker
```bash
# Version: 24.0+
# Install on Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose-plugin

# Install on macOS
brew install docker docker-compose

# Install on Windows
# Download Docker Desktop from https://www.docker.com/products/docker-desktop
```

#### 2. Docker Compose
```bash
# Version: 2.20+
# Usually included with Docker Desktop
# Or install separately:
sudo apt-get install docker-compose-plugin
```

**Verify Installation:**
```bash
docker --version        # Should show 24.0+
docker compose version  # Should show 2.20+
```

---

### Option B: Manual Installation

#### 1. Node.js & npm
```bash
# Version: Node.js 20.x, npm 10.x
# Install using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Or install directly
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node@20

# Verify
node --version  # v20.x.x
npm --version   # 10.x.x
```

#### 2. Python
```bash
# Version: Python 3.11+
# Ubuntu/Debian
sudo apt-get install python3.11 python3.11-venv python3-pip

# macOS
brew install python@3.11

# Verify
python3 --version  # Python 3.11.x
pip3 --version     # 23.x+
```

#### 3. PHP
```bash
# Version: PHP 8.3+
# Ubuntu/Debian
sudo apt-get install php8.3 php8.3-cli php8.3-common

# macOS
brew install php@8.3

# Verify
php --version  # PHP 8.3.x
```

#### 4. PostgreSQL
```bash
# Version: PostgreSQL 16+
# Ubuntu/Debian
sudo apt-get install postgresql-16 postgresql-client-16

# macOS
brew install postgresql@16

# Windows
# Download from https://www.postgresql.org/download/windows/

# Verify
psql --version  # psql (PostgreSQL) 16.x
```

#### 5. Redis
```bash
# Version: Redis 7+
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# Verify
redis-server --version  # Redis v=7.x.x
```

#### 6. Git
```bash
# Version: Git 2.30+
# Ubuntu/Debian
sudo apt-get install git

# macOS
brew install git

# Verify
git --version  # git version 2.x.x
```

---

## 🔧 Project Dependencies

### Frontend (React/TypeScript)
```bash
# Navigate to project root
cd autoflow-ai

# Install dependencies
npm install

# Key packages installed:
# - react@18.x
# - react-dom@18.x
# - react-router-dom@6.x
# - typescript@5.x
# - tailwindcss@3.x
# - recharts@2.x
# - framer-motion@11.x
# - lucide-react@latest
```

### Backend (Node.js/Express)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Key packages:
# - express@4.x
# - cors@2.x
# - helmet@7.x
# - express-rate-limit@7.x
# - jsonwebtoken@9.x
# - bcryptjs@2.x
# - pg@8.x (PostgreSQL client)
# - ioredis@5.x (Redis client)
# - dotenv@16.x
```

### Python Service (FastAPI)
```bash
# Navigate to Python service directory
cd python-service

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Key packages:
# - fastapi@0.109+
# - uvicorn@0.27+
# - pydantic@2.x
# - openai@1.x
# - python-dotenv@1.x
# - httpx@0.26+
```

---

## 🗄️ Database Setup

### PostgreSQL Configuration

#### 1. Create Database
```bash
# Start PostgreSQL service
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE USER autoflow WITH PASSWORD 'your_secure_password';
CREATE DATABASE autoflow OWNER autoflow;
GRANT ALL PRIVILEGES ON DATABASE autoflow TO autoflow;
\q
```

#### 2. Run Migrations
```bash
# Apply database schema
psql -U autoflow -d autoflow -f database/migrations/001_initial_schema.sql

# Verify tables created
psql -U autoflow -d autoflow -c "\dt"
```

#### 3. Database Tables Created
- `users` - User accounts
- `refresh_tokens` - JWT refresh tokens
- `workflows` - Automation workflows
- `workflow_steps` - Workflow step definitions
- `executions` - Workflow execution records
- `execution_steps` - Execution step details
- `webhooks` - Webhook endpoints
- `webhook_events` - Webhook event logs
- `integrations` - Connected services
- `oauth_connections` - OAuth tokens
- `api_keys` - API authentication keys
- `notifications` - User notifications
- `audit_logs` - System audit trail

---

## 🔐 Environment Configuration

### 1. Create .env File
```bash
# Copy example configuration
cp .env.example .env

# Edit with your values
nano .env  # or use your preferred editor
```

### 2. Required Environment Variables

#### Application
```env
APP_ENV=production
APP_PORT=3001
APP_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3000
```

#### Database
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autoflow
DB_USER=autoflow
DB_PASSWORD=your_secure_db_password_here
DATABASE_URL=postgresql://autoflow:your_secure_db_password_here@localhost:5432/autoflow
```

#### Redis
```env
REDIS_URL=redis://localhost:6379
```

#### Authentication (CRITICAL - Use Strong Secrets)
```env
# Generate with: openssl rand -base64 32
JWT_SECRET=your_jwt_secret_key_min_32_chars_here
JWT_REFRESH_SECRET=your_refresh_token_secret_min_32_chars
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

#### AI Service (Optional)
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=1000
```

#### Webhook Security
```env
# Generate with: openssl rand -hex 32
WEBHOOK_SECRET=your_webhook_hmac_secret_here
```

#### External Services
```env
PYTHON_SERVICE_URL=http://localhost:8001
PHP_SERVICE_URL=http://localhost:8080
N8N_URL=http://localhost:5678
```

#### OAuth Providers (Optional)
```env
# Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/oauth/google/callback

# GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/oauth/github/callback

# Slack
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
SLACK_CALLBACK_URL=http://localhost:3001/api/auth/oauth/slack/callback

# Microsoft
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
MICROSOFT_CALLBACK_URL=http://localhost:3001/api/auth/oauth/microsoft/callback
```

### 3. Frontend Configuration
```bash
# Create frontend environment file
cp .env.local.example .env.local

# Edit
nano .env.local
```

```env
# Frontend API URL
VITE_API_URL=http://localhost:3001
```

---

## 🚀 Installation Steps

### Method 1: Docker (Easiest)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/autoflow-ai.git
cd autoflow-ai

# 2. Configure environment
cp .env.example .env
nano .env  # Fill in your values

# 3. Configure frontend
cp .env.local.example .env.local
nano .env.local

# 4. Start all services
docker compose up -d

# 5. Verify services are running
docker compose ps

# 6. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# Python Service: http://localhost:8001
# PHP Service: http://localhost:8080
# n8n: http://localhost:5678
```

### Method 2: Manual Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/autoflow-ai.git
cd autoflow-ai

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install
cd ..

# 4. Install Python dependencies
cd python-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 5. Configure environment
cp .env.example .env
nano .env

# 6. Configure frontend
cp .env.local.example .env.local
nano .env.local

# 7. Setup database
createdb autoflow
psql autoflow < database/migrations/001_initial_schema.sql

# 8. Start services (in separate terminals)

# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Python Service
cd python-service
source venv/bin/activate
uvicorn main:app --reload --port 8001

# Terminal 3: PHP Service
cd php-service
php -S localhost:8080 -t public

# Terminal 4: Frontend
npm run dev

# 9. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# Python Service: http://localhost:8001
# PHP Service: http://localhost:8080
```

---

## 🔍 Verification Checklist

### After Installation, Verify:

```bash
# 1. Check all services are running
docker compose ps  # All should show "Up"

# 2. Test backend health
curl http://localhost:3001/api/health
# Expected: {"status":"healthy",...}

# 3. Test Python service
curl http://localhost:8001/api/health
# Expected: {"status":"healthy",...}

# 4. Test PHP service
curl http://localhost:8080/api/php/health
# Expected: {"status":"healthy",...}

# 5. Test database connection
psql -U autoflow -d autoflow -c "SELECT 1"
# Expected: 1 row

# 6. Test Redis connection
redis-cli ping
# Expected: PONG

# 7. Access frontend
open http://localhost:3000
# Expected: Landing page loads

# 8. Create test user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@test.com","password":"password123"}'
# Expected: User created with tokens

# 9. Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
# Expected: Login successful with tokens
```

---

## 📊 Services Overview

| Service | Port | Purpose | Required |
|---------|------|---------|----------|
| Frontend | 3000 | React SPA | ✅ Yes |
| Backend API | 3001 | Node.js Express | ✅ Yes |
| Python Service | 8001 | AI & Data Processing | ✅ Yes |
| PHP Service | 8080 | Legacy Integration | ⚠️ Optional |
| PostgreSQL | 5432 | Database | ✅ Yes |
| Redis | 6379 | Cache & Sessions | ⚠️ Optional |
| n8n | 5678 | Workflow Engine | ⚠️ Optional |

---

## 🔑 API Keys & Credentials

### Required for Full Functionality

1. **OpenAI API Key** (for AI features)
   - Get from: https://platform.openai.com/api-keys
   - Cost: Pay-per-use
   - Fallback: System works without it using rule-based classification

2. **OAuth Credentials** (for social login)
   - Google: https://console.cloud.google.com/
   - GitHub: https://github.com/settings/developers
   - Slack: https://api.slack.com/apps
   - Microsoft: https://portal.azure.com/

3. **n8n Credentials** (for workflow automation)
   - Self-hosted: Already included
   - Cloud: https://n8n.cloud/

### Optional Integrations

- **Make.com**: https://www.make.com/
- **Zapier**: https://zapier.com/
- **Slack Webhooks**: For notifications
- **Email Service**: SendGrid, Mailgun, etc.

---

## 🛠️ Development Tools (Optional)

### Recommended for Development

```bash
# Code Editor
# VS Code: https://code.visualstudio.com/

# API Testing
# Postman: https://www.postman.com/
# or Insomnia: https://insomnia.rest/

# Database GUI
# pgAdmin: https://www.pgadmin.org/
# or TablePlus: https://tableplus.com/

# Docker GUI (Optional)
# Docker Desktop: https://www.docker.com/products/docker-desktop/

# Git GUI (Optional)
# GitHub Desktop: https://desktop.github.com/
```

---

## 📝 Quick Start Commands

### Docker Setup
```bash
# Clone
git clone <repo-url> && cd autoflow-ai

# Configure
cp .env.example .env && nano .env
cp .env.local.example .env.local && nano .env.local

# Start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Manual Setup
```bash
# Clone
git clone <repo-url> && cd autoflow-ai

# Install
npm install
cd backend && npm install && cd ..
cd python-service && pip install -r requirements.txt && cd ..

# Configure
cp .env.example .env && nano .env
cp .env.local.example .env.local && nano .env.local

# Database
createdb autoflow
psql autoflow < database/migrations/001_initial_schema.sql

# Start (4 terminals)
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd python-service && source venv/bin/activate && uvicorn main:app --reload
# Terminal 3: cd php-service && php -S localhost:8080 -t public
# Terminal 4: npm run dev
```

---

## 🆘 Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>
```

**2. Database connection failed**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check credentials in .env
cat .env | grep DATABASE_URL
```

**3. Python service won't start**
```bash
# Check Python version
python3 --version  # Must be 3.11+

# Reinstall dependencies
cd python-service
pip install -r requirements.txt --force-reinstall
```

**4. Frontend can't connect to backend**
```bash
# Check VITE_API_URL
cat .env.local

# Test backend directly
curl http://localhost:3001/api/health
```

---

## 📚 Additional Resources

- **README.md** - Project overview
- **USAGE_GUIDE.md** - How to use the platform
- **DEPLOYMENT_CHECKLIST.md** - Production deployment guide
- **docs/API.md** - API documentation
- **docs/WEBHOOKS.md** - Webhook guide
- **docs/OAUTH.md** - OAuth setup
- **docs/MAKE.md** - Make.com integration
- **docs/ZAPIER.md** - Zapier integration

---

## ✅ Installation Complete Checklist

- [ ] System requirements met
- [ ] Docker installed (or manual dependencies)
- [ ] Repository cloned
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Python dependencies installed
- [ ] PostgreSQL installed and configured
- [ ] Redis installed (optional)
- [ ] .env file created and configured
- [ ] .env.local file created and configured
- [ ] Database created
- [ ] Database migrations run
- [ ] All services started
- [ ] Health checks passing
- [ ] Can access frontend at http://localhost:3000
- [ ] Can create user account
- [ ] Can login successfully
- [ ] Can create workflow
- [ ] Can test webhook

---

**Total Installation Time**: 
- Docker: ~10 minutes
- Manual: ~30-45 minutes

**Disk Space Required**: ~2-3GB for all services

**Ready to Deploy**: ✅ Yes, once all checks pass!
