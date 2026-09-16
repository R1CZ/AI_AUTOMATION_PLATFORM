# AutoFlow AI - Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set `DATABASE_URL` (PostgreSQL connection string)
- [ ] Set `REDIS_URL` (Redis connection string)
- [ ] Set `JWT_SECRET` (min 32 characters, random)
- [ ] Set `JWT_REFRESH_SECRET` (min 32 characters, random)
- [ ] Set `WEBHOOK_SECRET` (for webhook signature validation)
- [ ] Set `OPENAI_API_KEY` (optional - system works without it using fallback)
- [ ] Set `CORS_ORIGIN` (your frontend URL)
- [ ] Copy `.env.local.example` to `.env.local` for frontend
- [ ] Set `VITE_API_URL` in frontend `.env.local`

### 2. Database Setup
- [ ] PostgreSQL 16+ installed and running
- [ ] Create database: `createdb autoflow`
- [ ] Run migrations: `psql autoflow < database/migrations/001_initial_schema.sql`
- [ ] Verify tables created: `psql autoflow -c "\dt"`
- [ ] Test connection: `psql autoflow -c "SELECT 1"`

### 3. Redis Setup
- [ ] Redis 7+ installed and running
- [ ] Test connection: `redis-cli ping` (should return PONG)

### 4. Backend Service
- [ ] Navigate to `backend/` directory
- [ ] Run `npm install`
- [ ] Verify `server.js` exists
- [ ] Test startup: `npm run dev` (should start on port 3001)
- [ ] Test health endpoint: `curl http://localhost:3001/api/health`

### 5. Python Service
- [ ] Navigate to `python-service/` directory
- [ ] Run `pip install -r requirements.txt`
- [ ] Test startup: `uvicorn main:app --reload` (should start on port 8001)
- [ ] Test health endpoint: `curl http://localhost:8001/api/health`
- [ ] Test classification: `curl -X POST http://localhost:8001/api/classify -H "Content-Type: application/json" -d '{"text": "My internet is broken"}'`

### 6. PHP Service
- [ ] Navigate to `php-service/` directory
- [ ] Test startup: `php -S localhost:8080 -t public`
- [ ] Test health endpoint: `curl http://localhost:8080/api/php/health`

### 7. Frontend
- [ ] Navigate to root directory
- [ ] Run `npm install`
- [ ] Run `npm run build` (should complete without errors)
- [ ] Test dev server: `npm run dev` (should start on port 3000)
- [ ] Open browser: `http://localhost:3000`
- [ ] Verify landing page loads

### 8. Docker Setup (Alternative)
- [ ] Docker and Docker Compose installed
- [ ] Run `docker compose up -d`
- [ ] Verify all containers running: `docker compose ps`
- [ ] Check logs: `docker compose logs -f`
- [ ] Test services:
  - Frontend: http://localhost:3000
  - Backend: http://localhost:3001/api/health
  - Python: http://localhost:8001/api/health
  - PHP: http://localhost:8080/api/php/health
  - n8n: http://localhost:5678

---

## 🚀 Deployment Steps

### Option A: Docker Deployment (Recommended)

```bash
# 1. Clone repository
git clone <your-repo-url>
cd autoflow-ai

# 2. Configure environment
cp .env.example .env
nano .env  # Edit with your values

# 3. Configure frontend
cp .env.local.example .env.local
nano .env.local  # Set VITE_API_URL

# 4. Start all services
docker compose up -d

# 5. Verify deployment
docker compose ps
curl http://localhost:3001/api/health

# 6. Access application
open http://localhost:3000
```

### Option B: Manual Deployment

```bash
# 1. Start PostgreSQL
sudo systemctl start postgresql
createdb autoflow
psql autoflow < database/migrations/001_initial_schema.sql

# 2. Start Redis
sudo systemctl start redis

# 3. Start Backend
cd backend
npm install
npm run dev  # Or use pm2: pm2 start server.js --name autoflow-backend

# 4. Start Python Service
cd python-service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001  # Or use systemd

# 5. Start PHP Service
cd php-service
php -S 0.0.0.0:8080 -t public  # Or use Apache/Nginx

# 6. Build and serve Frontend
cd ..
npm install
npm run build
# Serve dist/ with nginx or any static file server
```

---

## 🔧 Production Configuration

### Nginx Configuration (for frontend)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/autoflow-ai/dist;
    index index.html;
    
    # API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Webhook proxy
    location /webhooks/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### SSL/HTTPS Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Process Management (PM2)
```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start server.js --name autoflow-backend

# Start Python service
cd ../python-service
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8001" --name autoflow-python

# Save PM2 configuration
pm2 save
pm2 startup
```

### Systemd Services (Alternative)

**Backend Service** (`/etc/systemd/system/autoflow-backend.service`):
```ini
[Unit]
Description=AutoFlow AI Backend
After=network.target postgresql.service redis.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/autoflow-ai/backend
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/path/to/autoflow-ai/.env

[Install]
WantedBy=multi-user.target
```

**Python Service** (`/etc/systemd/system/autoflow-python.service`):
```ini
[Unit]
Description=AutoFlow AI Python Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/autoflow-ai/python-service
ExecStart=/usr/local/bin/uvicorn main:app --host 0.0.0.0 --port 8001
Restart=always
EnvironmentFile=/path/to/autoflow-ai/.env

[Install]
WantedBy=multi-user.target
```

---

## 🔒 Security Checklist

- [ ] Change all default secrets in `.env`
- [ ] Use strong passwords (min 12 characters, mixed case, numbers, symbols)
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules (only expose ports 80, 443)
- [ ] Disable direct database access from internet
- [ ] Set up automated backups
- [ ] Enable logging and monitoring
- [ ] Set up rate limiting (already configured in backend)
- [ ] Review CORS settings
- [ ] Enable security headers (already configured via Helmet)
- [ ] Set up fail2ban for brute force protection
- [ ] Regular security updates

---

## 📊 Monitoring Setup

### Health Checks
```bash
# Backend
curl http://localhost:3001/api/health

# Python
curl http://localhost:8001/api/health

# PHP
curl http://localhost:8080/api/php/health

# Database
psql autoflow -c "SELECT 1"

# Redis
redis-cli ping
```

### Log Monitoring
```bash
# Backend logs
tail -f /var/log/autoflow-backend.log

# Python logs
journalctl -u autoflow-python -f

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Database logs
tail -f /var/log/postgresql/postgresql-*.log
```

### Metrics to Monitor
- API response times
- Error rates
- Database connection pool usage
- Redis memory usage
- Disk space
- CPU/Memory usage
- Workflow execution success rate
- Webhook delivery rate

---

## 🔄 Backup Strategy

### Database Backup
```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump autoflow | gzip > "$BACKUP_DIR/autoflow_$DATE.sql.gz"

# Keep last 30 days
find $BACKUP_DIR -name "autoflow_*.sql.gz" -mtime +30 -delete
```

### Cron Job
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

---

## 🧪 Testing Checklist

### Functional Tests
- [ ] Register new user
- [ ] Login with credentials
- [ ] Create workflow
- [ ] Execute workflow
- [ ] View executions
- [ ] Create webhook
- [ ] Test webhook with curl
- [ ] View analytics
- [ ] Connect integration
- [ ] Admin panel access

### API Tests
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create workflow (use token from login)
curl -X POST http://localhost:3001/api/workflows \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Test Workflow","description":"Test"}'

# Test webhook
curl -X POST http://localhost:3001/webhooks/whk_test \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'
```

### Load Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test API endpoint
ab -n 1000 -c 10 http://localhost:3001/api/health

# Test with authentication
ab -n 1000 -c 10 -H "Authorization: Bearer YOUR_TOKEN" \
   http://localhost:3001/api/workflows
```

---

## 📝 Post-Deployment Tasks

- [ ] Create admin user
- [ ] Configure OAuth providers (if needed)
- [ ] Set up email notifications (if needed)
- [ ] Import n8n workflows
- [ ] Configure external integrations
- [ ] Set up monitoring alerts
- [ ] Document deployment specifics
- [ ] Train team on usage
- [ ] Create user documentation
- [ ] Set up support process

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check logs
npm run dev 2>&1 | tee backend.log

# Check port availability
lsof -i :3001

# Check database connection
psql $DATABASE_URL -c "SELECT 1"
```

### Python service won't start
```bash
# Check Python version
python --version  # Should be 3.11+

# Check dependencies
pip list | grep fastapi

# Check port
lsof -i :8001
```

### Frontend can't connect to backend
```bash
# Check VITE_API_URL
cat .env.local

# Check CORS settings in backend
grep -A 5 "cors(" backend/server.js

# Test backend directly
curl http://localhost:3001/api/health
```

### Database connection failed
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check permissions
psql -U postgres -c "\du"
```

---

## ✅ Final Verification

Before going live:

1. **All services running?**
   ```bash
   docker compose ps  # All should be "Up"
   ```

2. **Health checks passing?**
   ```bash
   curl http://localhost:3001/api/health | jq .status  # Should be "healthy"
   ```

3. **Can create user?**
   - Open http://localhost:3000
   - Click "Sign Up"
   - Create account
   - Should redirect to dashboard

4. **Can create workflow?**
   - Go to Workflows
   - Click "New Workflow"
   - Add steps
   - Save

5. **Can execute workflow?**
   - Open workflow
   - Click "Test Run"
   - Check Executions page

6. **Webhooks working?**
   ```bash
   curl -X POST http://localhost:3001/webhooks/whk_test \
     -H "Content-Type: application/json" \
     -d '{"test":"data"}'
   ```

---

## 🎉 Deployment Complete!

Your AutoFlow AI platform is now live and ready to use.

**Access points:**
- Frontend: http://your-domain.com
- API: http://your-domain.com/api
- API Docs: http://your-domain.com/api-docs
- n8n: http://your-domain.com:5678 (if exposed)

**Next steps:**
1. Create your first workflow
2. Set up webhooks for your applications
3. Connect integrations
4. Monitor executions
5. Optimize based on analytics

For support, check:
- `README.md` - Project overview
- `USAGE_GUIDE.md` - How to use the system
- `docs/API.md` - API documentation
- `docs/WEBHOOKS.md` - Webhook guide
