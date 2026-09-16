# AutoFlow AI — REST API Documentation

## Base URL
```
https://api.autoflow.ai
```

## Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <access_token>
```

## Rate Limiting
- 1000 requests per minute per API key
- Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Response Format
```json
{
  "status": "success",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Error Format
```json
{
  "error": {
    "code": 422,
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid format" }
    ]
  }
}
```

---

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": { "id": "usr_...", "name": "John Doe", "email": "john@example.com", "role": "USER" },
    "access_token": "eyJ...",
    "refresh_token": "dGhpc..."
  }
}
```

### POST /api/auth/login
Authenticate and receive tokens.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": { "id": "usr_...", "name": "John Doe", "role": "USER" },
    "access_token": "eyJ...",
    "refresh_token": "dGhpc...",
    "expires_in": 3600
  }
}
```

### POST /api/auth/refresh
Refresh an expired access token.

**Request:**
```json
{ "refresh_token": "dGhpc..." }
```

### POST /api/auth/oauth/:provider
Initiate OAuth 2.0 flow (google, github, slack, microsoft).

---

## Workflow Endpoints

### GET /api/workflows
List all workflows (paginated).

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `status` (active, inactive, draft)
- `search` (search by name)

### POST /api/workflows
Create a new workflow.

**Request:**
```json
{
  "name": "Customer Support Bot",
  "description": "Auto-process customer inquiries",
  "trigger": { "type": "webhook", "config": { "path": "/webhooks/support" } },
  "steps": [
    { "type": "webhook", "name": "Receive", "config": {} },
    { "type": "ai", "name": "Classify", "config": { "model": "gpt-4" } },
    { "type": "database", "name": "Store", "config": { "table": "tickets" } }
  ]
}
```

### GET /api/workflows/:id
Get workflow details with all steps.

### PUT /api/workflows/:id
Update a workflow.

### DELETE /api/workflows/:id
Delete a workflow.

### POST /api/workflows/:id/execute
Manually trigger workflow execution.

**Request:**
```json
{ "input_data": { "name": "Test", "email": "test@test.com" } }
```

### GET /api/workflows/:id/logs
Get execution logs for a workflow.

---

## Execution Endpoints

### GET /api/executions
List executions (paginated, filterable).

**Query Parameters:**
- `workflow_id`
- `status` (success, running, failed, cancelled)
- `page`, `limit`
- `from` (ISO date)
- `to` (ISO date)

### GET /api/executions/:id
Get execution details with step-by-step logs.

---

## Webhook Endpoints

### POST /api/webhooks
Create a new webhook endpoint.

**Request:**
```json
{
  "name": "Customer Support",
  "workflow_id": "wf_001",
  "secret": "custom_secret_or_auto_generated"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "whk_...",
    "url": "https://api.autoflow.ai/webhooks/whk_abc123",
    "secret": "whsec_...",
    "status": "active"
  }
}
```

### GET /api/webhooks
List all webhooks.

### POST /webhooks/:id (Public)
Receive a webhook event. No authentication required (validated by signature).

**Headers:**
```
Content-Type: application/json
X-Webhook-Secret: whsec_your_secret
X-Webhook-Signature: hmac_sha256_signature
```

---

## Integration Endpoints

### GET /api/integrations
List all integrations with connection status.

### POST /api/integrations/:id/connect
Connect an integration (initiates OAuth or API key setup).

### DELETE /api/integrations/:id/disconnect
Disconnect an integration.

---

## Analytics Endpoints

### GET /api/analytics
Get platform analytics data.

**Query Parameters:**
- `period` (day, week, month)
- `workflow_id` (optional filter)

**Response:**
```json
{
  "executions": { "total": 1247, "success": 1220, "failed": 27 },
  "api_requests": { "total": 28470, "avg_response_ms": 45 },
  "webhooks": { "total_events": 1247, "active_endpoints": 5 },
  "top_workflows": [...]
}
```

---

## System Endpoints

### GET /api/health
System health check (no auth required).

**Response:**
```json
{
  "status": "healthy",
  "services": {
    "api": "healthy",
    "database": "healthy",
    "redis": "healthy",
    "python_service": "healthy",
    "php_service": "healthy",
    "n8n": "healthy",
    "ai_service": "healthy"
  },
  "version": "1.0.0",
  "uptime": "72h 34m"
}
```
