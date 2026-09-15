# Zapier Integration Guide

## Overview
AutoFlow AI integrates with Zapier through REST API endpoints and webhook triggers, enabling you to connect AutoFlow's AI processing to 5000+ apps available in Zapier.

## Architecture

```
Zapier Trigger → AutoFlow Webhook → AI Processing → Response → Zapier Action
```

## Setup Instructions

### Step 1: Create AutoFlow Webhook for Zapier

1. In AutoFlow dashboard, go to **Webhooks**
2. Create a new webhook named "Zapier Integration"
3. Copy the webhook URL: `POST /webhooks/whk_zapier_id`
4. Copy the webhook secret

### Step 2: Configure Zapier (Trigger Side)

#### Option A: Webhooks by Zapier (Catch Hook)
1. Create a new Zap
2. Trigger: **Webhooks by Zapier** → **Catch Hook**
3. Copy the Custom Webhook URL
4. In AutoFlow, create an outbound webhook pointing to this URL
5. Test the trigger in Zapier

#### Option B: AutoFlow as Zapier Trigger
1. In Zapier, create a trigger using **Webhooks by Zapier**
2. Set the URL to your AutoFlow webhook endpoint
3. AutoFlow will POST results back to Zapier when processing completes

### Step 3: Configure Zapier (Action Side)

1. After the trigger, add an action
2. Choose **Webhooks by Zapier** → **POST**
3. URL: `https://api.autoflow.ai/webhooks/whk_your_id`
4. Configure payload mapping

### Step 4: Example Configuration

**Zapier Webhook POST to AutoFlow:**
```
URL: https://api.autoflow.ai/webhooks/whk_zapier_id
Method: POST
Headers:
  Content-Type: application/json
  X-Webhook-Secret: whsec_your_secret
Data:
  {
    "source": "zapier",
    "trigger_app": "{{zap_trigger_app}}",
    "data": {
      "name": "{{name}}",
      "email": "{{email}}",
      "message": "{{message}}",
      "metadata": "{{all_data}}"
    }
  }
```

**AutoFlow Response:**
```json
{
  "status": "success",
  "execution_id": "exec_xyz789",
  "workflow_triggered": "Zapier → AutoFlow Processing",
  "result": {
    "category": "General Question",
    "priority": "medium",
    "sentiment": "neutral",
    "ai_response": "Thank you for your inquiry...",
    "routing": "general_support"
  }
}
```

## Authentication Methods

### Method 1: Webhook Secret (Simple)
```
Headers:
  X-Webhook-Secret: whsec_your_webhook_secret
```

### Method 2: API Key (Recommended for production)
```
Headers:
  Authorization: Bearer your_api_key
```

### Method 3: OAuth 2.0 (For Zapier Platform CLI)
```
AutoFlow OAuth endpoints:
  Authorize: https://api.autoflow.ai/api/auth/oauth/authorize
  Token: https://api.autoflow.ai/api/auth/oauth/token
  Refresh: https://api.autoflow.ai/api/auth/oauth/refresh
```

## Zapier Platform CLI Integration

For advanced integrations, build a custom Zapier app:

```javascript
// zapier-app/index.js
const authentication = {
  type: 'oauth2',
  oauth2Config: {
    authorizeUrl: {
      url: 'https://api.autoflow.ai/api/auth/oauth/authorize',
      params: { client_id: '{{process.env.CLIENT_ID}}', response_type: 'code' }
    },
    getAccessToken: {
      url: 'https://api.autoflow.ai/api/auth/oauth/token',
      method: 'POST',
      body: {
        code: '{{bundle.inputData.code}}',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
        grant_type: 'authorization_code'
      }
    }
  }
};

const triggers = {
  new_processed_event: {
    key: 'new_processed_event',
    noun: 'Processed Event',
    display: { label: 'New Processed Event' },
    operation: {
      perform: {
        url: 'https://api.autoflow.ai/api/executions?status=success&limit=10',
        headers: { 'Authorization': 'Bearer {{bundle.authData.access_token}}' }
      }
    }
  }
};
```

## Use Cases

1. **Gmail → AI → Slack**: Classify emails and route to Slack channels
2. **Typeform → Score → CRM**: Score form submissions and add to CRM
3. **Shopify → Analyze → Notify**: Analyze orders and notify teams
4. **Google Forms → Classify → Sheets**: Classify responses and log to Sheets
5. **Calendly → Process → CRM**: Process booking data through AI pipeline

## Error Handling

Configure Zapier to handle AutoFlow errors:
- **429 (Rate Limited)**: Zapier auto-retries with backoff
- **500 (Server Error)**: Add a Filter step to retry
- **422 (Validation)**: Check Zapier field mapping

## Rate Limits

- Zapier Free: 100 tasks/month
- AutoFlow API: 1000 requests/minute
- Combined: Plan accordingly for high-volume workflows
