# n8n Workflows — AutoFlow AI

This directory contains n8n workflow definitions used by the AutoFlow AI platform.

## Workflows

### 1. Customer Support Automation (`customer-support-automation.json`)
Processes incoming customer inquiries through AI classification and routes them appropriately.

**Flow:**
```
Webhook → Validate Input → Python AI Classification → Priority Check → Database → Slack Notification → Response
```

**Trigger:** POST to `/webhooks/customer-support`

**Example Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "My internet connection is not working"
}
```

### 2. Lead Qualification Pipeline (`lead-qualification.json`)
Scores and qualifies incoming leads using Python ML models.

**Flow:**
```
Webhook → Validate Lead → Python Lead Scoring → Quality Gate (score ≥ 70) → Store → Notify Sales → Response
```

**Trigger:** POST to `/webhooks/new-lead`

**Example Payload:**
```json
{
  "name": "Jane Smith",
  "email": "jane@acme.com",
  "company": "Acme Corporation",
  "industry": "technology",
  "company_size": "enterprise",
  "budget": "$100k+",
  "urgency": "immediate"
}
```

### 3. Error Monitoring (`error-monitoring.json`)
Monitors automation failures and alerts administrators.

**Flow:**
```
Schedule (every 5 min) → Check Failed Executions → Error Analysis → Log → Notify Admin
```

## Setup

1. Import workflows into n8n: `n8n → Settings → Import from File`
2. Configure webhook URLs to match your deployment
3. Set up credentials for Slack, PostgreSQL, and Python service
4. Activate workflows

## Environment Variables Required

```env
N8N_URL=http://localhost:5678
PYTHON_SERVICE_URL=http://python-service:8001
BACKEND_URL=http://backend:3001
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
```
