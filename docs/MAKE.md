# Make.com Integration Guide

## Overview
AutoFlow AI integrates with Make.com (formerly Integromat) through webhook-based communication, allowing you to connect AutoFlow's AI processing pipeline to Make.com's 1000+ app integrations.

## Architecture

```
Make.com Scenario → Webhook → AutoFlow API → AI Processing → Response → Make.com Action
```

## Setup Instructions

### Step 1: Create AutoFlow Webhook

1. Navigate to **Webhooks** in the AutoFlow dashboard
2. Click **Create Webhook**
3. Name it "Make.com Integration"
4. Note the webhook URL: `POST /webhooks/whk_your_unique_id`
5. Copy the webhook secret

### Step 2: Configure Make.com Scenario

1. In Make.com, create a new scenario
2. Add a **Webhook** module as trigger
3. Set the webhook URL to your AutoFlow endpoint:
   ```
   POST https://api.autoflow.ai/webhooks/whk_your_unique_id
   ```
4. Add headers:
   ```
   Content-Type: application/json
   X-Webhook-Secret: your_secret_here
   ```

### Step 3: Configure Response Handling

1. Add an **HTTP** module after your trigger
2. Set method to POST
3. URL: `https://api.autoflow.ai/webhooks/whk_your_unique_id`
4. Body type: Raw (JSON)

### Step 4: Example Payload

**Request:**
```json
{
  "source": "make.com",
  "event": "new_contact",
  "data": {
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@company.com",
    "company": "TechCorp",
    "message": "Interested in enterprise plan"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "execution_id": "exec_abc123",
  "result": {
    "category": "Sales Inquiry",
    "priority": "high",
    "sentiment": "positive",
    "lead_score": 82,
    "recommended_action": "Schedule demo call"
  }
}
```

### Step 5: Add Follow-up Actions in Make.com

After receiving the AutoFlow response, add modules:
- **Router** — Route based on `result.priority`
- **Slack** — Notify team for high-priority items
- **Google Sheets** — Log all processed leads
- **Gmail** — Send automated response

## Authentication

Make.com supports two authentication methods:

### API Key (Recommended)
```
Headers:
  X-API-Key: your_autoflow_api_key
```

### Webhook Secret
```
Headers:
  X-Webhook-Secret: whsec_your_webhook_secret
```

## Error Handling

AutoFlow returns standard HTTP status codes:
- `200` — Success
- `400` — Invalid payload
- `401` — Authentication failed
- `422` — Validation error
- `429` — Rate limited
- `500` — Server error

Configure Make.com error handlers to retry on 429/500.

## Rate Limits

- Free tier: 100 requests/minute
- Pro tier: 1000 requests/minute
- Enterprise: Custom limits

## Use Cases

1. **CRM → AI → CRM**: Process new contacts through AI before storing
2. **Form → Classify → Route**: Classify form submissions and route to teams
3. **Email → Sentiment → Alert**: Analyze email sentiment and alert on negative
4. **E-commerce → Score → Notify**: Score orders and notify fulfillment
