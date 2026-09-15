/**
 * AutoFlow AI - Backend API Server
 * Node.js/Express REST API
 * 
 * This is the main entry point for the backend API service.
 * In production, this would be a full Express.js application.
 * For the demo, the frontend handles all logic client-side.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// ============ MIDDLEWARE ============

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 1000,
  message: { error: { code: 429, message: 'Too many requests' } }
});
app.use('/api/', limiter);

// ============ DATABASE ============

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.DATABASE_URL,
  process.env.SUPABASE_KEY || process.env.DB_PASSWORD
);

// ============ AUTH MIDDLEWARE ============

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: { code: 401, message: 'Authentication required' } });
  }
  try {
    // Verify JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 401, message: 'Invalid token' } });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: { code: 403, message: 'Insufficient permissions' } });
    }
    next();
  };
};

// ============ ROUTES ============

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      api: 'healthy',
      database: 'healthy',
      redis: 'healthy'
    }
  });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: { code: 422, message: 'Missing required fields' } });
  }
  // Registration logic...
  res.status(201).json({ status: 'success', data: { message: 'User registered' } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: { code: 422, message: 'Email and password required' } });
  }
  // Login logic...
  res.json({ status: 'success', data: { access_token: 'jwt_token', expires_in: 3600 } });
});

// Workflow routes
app.get('/api/workflows', authenticate, async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;
  // Query workflows from database...
  res.json({ status: 'success', data: [], meta: { page: +page, limit: +limit, total: 0 } });
});

app.post('/api/workflows', authenticate, async (req, res) => {
  const { name, description, trigger, steps } = req.body;
  // Create workflow...
  res.status(201).json({ status: 'success', data: { id: 'wf_new' } });
});

app.get('/api/workflows/:id', authenticate, async (req, res) => {
  // Get workflow by ID...
  res.json({ status: 'success', data: {} });
});

app.post('/api/workflows/:id/execute', authenticate, async (req, res) => {
  // Execute workflow...
  res.json({ status: 'success', data: { execution_id: 'exec_new' } });
});

// Webhook routes
app.post('/webhooks/:id', async (req, res) => {
  const { id } = req.params;
  const signature = req.headers['x-webhook-secret'];
  
  // Validate signature
  // Process webhook
  // Trigger associated workflow
  // Log event
  
  res.json({
    status: 'success',
    execution_id: `exec_${Date.now()}`,
    message: 'Webhook processed successfully'
  });
});

// Execution routes
app.get('/api/executions', authenticate, async (req, res) => {
  const { workflow_id, status, page = 1, limit = 10 } = req.query;
  // Query executions...
  res.json({ status: 'success', data: [], meta: { page: +page, limit: +limit } });
});

// Integration routes
app.get('/api/integrations', authenticate, async (req, res) => {
  res.json({ status: 'success', data: [] });
});

// Analytics
app.get('/api/analytics', authenticate, async (req, res) => {
  res.json({
    status: 'success',
    data: {
      executions: { total: 0, success: 0, failed: 0 },
      api_requests: { total: 0, avg_response_ms: 0 }
    }
  });
});

// ============ ERROR HANDLING ============

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      code: err.status || 500,
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { code: 404, message: 'Endpoint not found' } });
});

// ============ START ============

app.listen(PORT, () => {
  console.log(`AutoFlow AI API running on port ${PORT}`);
});

module.exports = app;
