# Webhook System Documentation

## Overview
AutoFlow AI provides a secure webhook system for receiving external events. Each webhook endpoint is associated with a workflow that processes incoming data.

## Creating Webhooks

### Via API
```bash
POST /api/webhooks
Authorization: Bearer <token>

{
  "name": "Customer Support",
  "workflow_id": "wf_001"
}
```

### Via Dashboard
1. Navigate to Webhooks page
2. Click "Create Webhook"
3. Name the webhook and select a workflow
4. Copy the generated URL and secret

## Receiving Webhooks

### Endpoint Format
```
POST https://api.autoflow.ai/webhooks/{webhook_id}
```

### Required Headers
```
Content-Type: application/json
X-Webhook-Secret: whsec_your_secret
```

### Optional Headers (for enhanced security)
```
X-Webhook-Signature: <hmac_sha256_signature>
X-Webhook-Timestamp: <unix_timestamp>
```

### Example Request
```bash
curl -X POST https://api.autoflow.ai/webhooks/whk_a8f3b2c1d4e5 \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: whsec_your_secret" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need help with my account"
  }'
```

### Example Response
```json
{
  "status": "success",
  "execution_id": "exec_abc123def456",
  "workflow_triggered": "AI Customer Support Automation",
  "message": "Webhook processed successfully",
  "processing_time_ms": 234
}
```

## Signature Validation

### Generating Signatures
```python
import hmac
import hashlib
import json

secret = "whsec_your_secret"
payload = json.dumps(data, separators=(',', ':'))
signature = hmac.new(
    secret.encode('utf-8'),
    payload.encode('utf-8'),
    hashlib.sha256
).hexdigest()
```

```javascript
const crypto = require('crypto');
const secret = 'whsec_your_secret';
const payload = JSON.stringify(data);
const signature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');
```

### Validation Flow
1. Receive webhook request
2. Extract `X-Webhook-Signature` header
3. Compute expected signature from payload + secret
4. Compare signatures (constant-time comparison)
5. Reject if mismatch (401 Unauthorized)

## Retry Mechanism

If the associated workflow fails:
1. **Attempt 1**: Immediate execution
2. **Attempt 2**: After 30 seconds
3. **Attempt 3**: After 2 minutes
4. **Attempt 4**: After 10 minutes
5. **Attempt 5**: After 1 hour (final)

After 5 failures, the event is marked as failed and logged.

## Event Logging

All webhook events are stored with:
- Full request payload
- Request headers (sanitized)
- Signature validation result
- Associated execution ID
- Processing duration
- Response status

View logs at: `GET /api/webhooks/:id/events`

## Rate Limiting

- Per webhook: 100 events/minute
- Per IP: 60 requests/minute
- Returns `429 Too Many Requests` when exceeded

## Security Best Practices

1. **Always validate signatures** — Never skip signature validation
2. **Use HTTPS** — All webhook endpoints require TLS
3. **Rotate secrets** — Change webhook secrets periodically
4. **Validate payloads** — Always validate incoming data structure
5. **Idempotency** — Use execution IDs to prevent duplicate processing
6. **Timeout handling** — Set reasonable timeouts (30s recommended)
7. **IP whitelisting** — Restrict to known source IPs when possible

## Webhook Testing

### Test via Dashboard
1. Go to Webhooks page
2. Click "Test" on any webhook
3. Enter a JSON payload
4. Click "Send Test Request"
5. View the response and execution details

### Test via API
```bash
POST /api/webhooks/:id/test
Authorization: Bearer <token>

{
  "payload": {
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }
}
```

## Supported Content Types

- `application/json` (recommended)
- `application/x-www-form-urlencoded`
- `multipart/form-data` (file uploads)

## Payload Size Limits

- Maximum payload: 1MB
- Maximum field size: 100KB
- Maximum array length: 1000 items
