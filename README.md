# AutoFlow AI — Intelligent Business Automation Platform

A production-grade AI automation platform that connects applications through REST APIs, webhooks, OAuth, and automation engines (n8n, Make.com, Zapier), with Python and PHP services handling backend processing.

![AutoFlow AI](https://img.shields.io/badge/AutoFlow-AI-violet)
![License](https://img.shields.io/badge/license-MIT-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 🚀 Overview

AutoFlow AI is a full-stack automation platform that demonstrates practical integration of:
- **AI Processing** (OpenAI GPT-4 for classification, sentiment, intent detection)
- **Workflow Automation** (n8n engine with visual builder)
- **REST APIs** (Complete CRUD with authentication, rate limiting, pagination)
- **Webhooks** (HMAC-SHA256 validation, retry logic, event logging)
- **OAuth 2.0** (Google, GitHub, Slack, Microsoft providers)
- **Python Service** (ML, data processing, lead scoring)
- **PHP Service** (Legacy system integration, data transformation)
- **JavaScript/TypeScript** (React SPA, workflow builder, real-time UI)
- **Make.com & Zapier** (Third-party automation bridges)

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (React/TS)                      │
│  Dashboard │ Workflow Builder │ Executions │ Integrations │ Admin │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API / WebSockets
┌────────────────────────────▼────────────────────────────────────┐
│                      API GATEWAY (Node.js)                       │
│  Auth (JWT/OAuth) │ Rate Limiting │ Validation │ Error Handling  │
└──┬─────────────┬──────────────┬──────────────┬─────────────────┘
   │             │              │              │
┌──▼──┐    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
│ n8n │    │ Python  │   │   PHP   │   │   AI    │
│Engine│   │Service  │   │ Service │   │Service  │
└──┬──┘    └────┬────┘   └────┬────┘   └────┬────┘
   │            │              │              │
┌──▼────────────▼──────────────▼──────────────▼─────────────────┐
│                      DATA LAYER                                 │
│  PostgreSQL │ Redis Cache │ Webhook Events │ Audit Logs         │
└─────────────────────────────────────────────────────────────────┘
```

## ✨ Features

### Core Platform
- **Visual Workflow Builder** — Drag-and-drop workflow creation with 12+ step types
- **Real-time Dashboard** — Live execution monitoring, charts, and statistics
- **Execution Logs** — Step-by-step execution tracking with input/output inspection
- **Integration Hub** — Manage connections to n8n, Make.com, Zapier, Slack, GitHub, etc.
- **Webhook System** — Create secure endpoints with signature validation
- **Admin Panel** — User management, system health, and API usage monitoring

### Automation
- **n8n Workflows** — Pre-built workflows for customer support, lead qualification, error monitoring
- **AI Processing** — Text classification, sentiment analysis, intent detection, response generation
- **Python ML** — Lead scoring, data validation, text transformation
- **PHP Legacy Bridge** — Customer data sync, format conversion (JSON ↔ XML)
- **Make.com & Zapier** — Webhook bridges for 6000+ app integrations

### Security
- JWT authentication with refresh tokens
- OAuth 2.0 flows (Google, GitHub, Slack, Microsoft)
- HMAC-SHA256 webhook signature validation
- Role-based access control (ADMIN, USER, VIEWER)
- API key management with rate limiting
- Input validation and sanitization
- SQL injection protection
- XSS protection

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React, TypeScript, Tailwind CSS | SPA with workflow builder, dashboard |
| Backend | Node.js, Express | REST API, authentication, orchestration |
| AI | OpenAI GPT-4, Python NLP | Classification, sentiment, generation |
| Automation | n8n | Workflow engine, scheduling |
| Data Processing | Python (FastAPI) | ML, scoring, validation |
| Legacy | PHP | Customer data, format conversion |
| Database | PostgreSQL 16 | Primary data store |
| Cache | Redis 7 | Caching, queues, sessions |
| Integration | Make.com, Zapier | External app connectivity |
| Infrastructure | Docker Compose | Containerized deployment |

## 📦 Installation

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- PHP 8.3+
- PostgreSQL 16+
- Redis 7+

### Quick Start with Docker

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/autoflow-ai.git
cd autoflow-ai

# 2. Configure environment
cp .env.example .env
# Edit .env with your API keys and secrets

# 3. Configure frontend
cp .env.local.example .env.local
# Set VITE_API_URL to your backend URL

# 4. Start all services
docker compose up -d

# 5. Access the application
# Frontend: http://localhost:3000
# API: http://localhost:3001
# n8n: http://localhost:5678
# Python: http://localhost:8001
# PHP: http://localhost:8080
```

### Manual Setup

```bash
# Frontend
npm install
cp .env.local.example .env.local
npm run dev

# Backend
cd backend && npm install && npm run dev

# Python Service
cd python-service && pip install -r requirements.txt && uvicorn main:app --reload

# PHP Service
cd php-service && php -S localhost:8080 -t public
```

### Production Deployment

```bash
# Build frontend for production
npm run build

# Use Docker for production deployment
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🔌 API Documentation

### Authentication
```bash
# Register
POST /api/auth/register
{ "email": "user@example.com", "password": "secure123", "name": "John" }

# Login
POST /api/auth/login
{ "email": "user@example.com", "password": "secure123" }
# Returns: { "access_token": "eyJ...", "refresh_token": "dGhpc..." }

# Use token
GET /api/workflows
Authorization: Bearer eyJ...
```

### Key Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/workflows | List all workflows |
| POST | /api/workflows | Create workflow |
| POST | /api/workflows/:id/execute | Execute workflow |
| GET | /api/executions | List executions |
| POST | /api/webhooks | Create webhook |
| POST | /webhooks/:id | Receive webhook event |
| GET | /api/integrations | List integrations |
| GET | /api/analytics | Get analytics |
| GET | /api/health | System health check |

### Webhook Example
```bash
curl -X POST https://api.autoflow.ai/webhooks/whk_a8f3b2c1d4e5 \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: whsec_your_secret" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need technical support"
  }'
```

## 🤖 n8n Workflows

### Workflow 1: Customer Support Automation
```
Webhook → Validate → Python API → AI Classification → Priority Check → Database → Notification
```

### Workflow 2: Lead Qualification Pipeline
```
Webhook → Validate Lead → Python Scoring → Quality Gate → Store → Notify Sales
```

### Workflow 3: Error Monitoring
```
Schedule → Check Failures → Error Analysis → Log → Notify Admin
```

Import workflows from `n8n/workflows/` directory.

## 🔗 External Integrations

### Make.com Setup
1. Create a Webhook module in your Make.com scenario
2. Point it to: `POST /webhooks/whk_your_id`
3. Add X-Webhook-Secret header
4. Configure response handling

### Zapier Setup
1. Create a Zap with Webhooks by Zapier trigger
2. Set URL to: `POST /webhooks/whk_your_id`
3. Configure catch hook with expected fields
4. Add action steps for response processing

### OAuth Configuration
Set environment variables for each provider:
```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

## 🧪 Testing

```bash
# Run all tests
npm test

# API tests
npm run test:api

# Integration tests
npm run test:integration

# Python service tests
cd python-service && pytest

# E2E tests
npm run test:e2e
```

## 📁 Project Structure

```
autoflow-ai/
├── frontend/           # React/TypeScript SPA
│   ├── src/
│   │   ├── pages/      # Dashboard, Workflows, etc.
│   │   ├── components/ # Reusable UI components
│   │   ├── data/       # Mock data & services
│   │   └── types/      # TypeScript interfaces
│   └── public/
├── backend/            # Node.js API server
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── services/
├── python-service/     # Python AI & data processing
│   ├── main.py
│   ├── services/
│   └── tests/
├── php-service/        # PHP legacy integration
│   ├── public/
│   └── src/
├── n8n/               # n8n workflow definitions
│   └── workflows/
├── database/          # PostgreSQL migrations
│   └── migrations/
├── docs/              # Documentation
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔒 Security

- Never commit `.env` or secrets to version control
- All API keys stored in environment variables
- JWT tokens with configurable expiration
- Webhook signatures validated with HMAC-SHA256
- Input sanitization on all endpoints
- Rate limiting on public endpoints
- CORS configured for specific origins
- SQL injection prevention via parameterized queries

## 📄 License

MIT License - feel free to use this project for portfolio, learning, or commercial purposes.

## 🙏 Acknowledgments

Built with React, TypeScript, Tailwind CSS, n8n, Python (FastAPI), PHP, PostgreSQL, Redis, Docker, and OpenAI.
