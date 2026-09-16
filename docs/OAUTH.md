# OAuth 2.0 Documentation

## Overview
AutoFlow AI implements OAuth 2.0 for both user authentication and external service integration.

## User Authentication (OAuth 2.0 + JWT)

### Flow
1. User logs in with email/password or OAuth provider
2. Server validates credentials
3. Server issues JWT access token (short-lived) + refresh token (long-lived)
4. Client stores tokens securely
5. Access token included in all API requests
6. Refresh token used to obtain new access tokens

### Endpoints

#### POST /api/auth/login
```json
// Request
{ "email": "user@example.com", "password": "password123" }

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": { "id": "usr_001", "name": "Alex", "role": "ADMIN" }
}
```

#### POST /api/auth/refresh
```json
// Request
{ "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..." }

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}
```

## External Service OAuth

### Supported Providers

| Provider | Scopes | Use Case |
|----------|--------|----------|
| Google | profile, email, calendar | Workspace integration |
| GitHub | repo, user, webhooks | Repository management |
| Slack | chat:write, channels:read | Team notifications |
| Microsoft | User.Read, Mail.Send | Office 365 integration |

### OAuth Flow (Authorization Code)

#### Step 1: Redirect to Provider
```
GET /api/auth/oauth/:provider
→ Redirects to provider's authorization URL
```

#### Step 2: User Authorizes
User logs in and grants permissions on provider's site.

#### Step 3: Callback
```
GET /api/auth/oauth/:provider/callback?code=xxx&state=yyy
→ Server exchanges code for tokens
→ Stores encrypted tokens
→ Returns connection status
```

### Configuration

Set environment variables for each provider:

```env
# Google
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
GOOGLE_CALLBACK_URL=https://api.autoflow.ai/api/auth/oauth/google/callback

# GitHub
GITHUB_CLIENT_ID=Iv1.xxx
GITHUB_CLIENT_SECRET=xxx
GITHUB_CALLBACK_URL=https://api.autoflow.ai/api/auth/oauth/github/callback

# Slack
SLACK_CLIENT_ID=xxx.xxx.xxx
SLACK_CLIENT_SECRET=xxx
SLACK_CALLBACK_URL=https://api.autoflow.ai/api/auth/oauth/slack/callback

# Microsoft
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx
MICROSOFT_CALLBACK_URL=https://api.autoflow.ai/api/auth/oauth/microsoft/callback
```

## Token Management

### Access Tokens
- Format: JWT (HS256)
- Expiration: 1 hour (configurable)
- Contains: user_id, role, permissions

### Refresh Tokens
- Format: Opaque string (stored hashed)
- Expiration: 7 days (configurable)
- Single-use (rotation on each refresh)
- Stored in database with revocation support

### Token Revocation
```
POST /api/auth/revoke
Authorization: Bearer <access_token>
{ "refresh_token": "token_to_revoke" }
```

## Role-Based Access Control

| Role | Permissions |
|------|-------------|
| ADMIN | Full access: manage users, workflows, integrations, system |
| USER | Create/manage own workflows, view executions, manage integrations |
| VIEWER | Read-only access to dashboards and logs |

## Security Measures

1. **Password Hashing**: bcrypt with cost factor 12
2. **JWT Signing**: HS256 with 32+ character secret
3. **Token Storage**: Refresh tokens stored as hashes
4. **HTTPS Required**: All OAuth flows over TLS
5. **State Parameter**: CSRF protection via state parameter
6. **Scope Limitation**: Request minimum required scopes
7. **Token Rotation**: Refresh tokens rotated on each use
8. **Rate Limiting**: Login attempts limited to 5/minute
9. **Account Lockout**: After 10 failed attempts, 15-minute lockout
