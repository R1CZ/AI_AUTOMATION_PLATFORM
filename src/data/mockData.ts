import { Workflow, Execution, Integration, Webhook, ApiEndpoint, User } from '../types';

export const mockUser: User = {
  id: 'usr_001',
  name: 'Alex Johnson',
  email: 'alex@autoflow.ai',
  role: 'ADMIN',
  createdAt: '2024-01-15T10:00:00Z'
};

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf_001',
    name: 'AI Customer Support Automation',
    description: 'Automatically process customer inquiries using AI classification, generate responses, and route to appropriate teams.',
    status: 'active',
    trigger: { id: 't1', type: 'webhook', name: 'Webhook Trigger', config: { path: '/webhooks/customer-support' }, position: { x: 0, y: 0 } },
    steps: [
      { id: 's1', type: 'webhook', name: 'Receive Inquiry', config: {}, position: { x: 0, y: 1 } },
      { id: 's2', type: 'python', name: 'Validate Input', config: { endpoint: '/api/process' }, position: { x: 0, y: 2 } },
      { id: 's3', type: 'ai', name: 'AI Classification', config: { model: 'gpt-4', task: 'classify' }, position: { x: 0, y: 3 } },
      { id: 's4', type: 'condition', name: 'Priority Check', config: { field: 'priority', operator: 'eq', value: 'high' }, position: { x: 0, y: 4 } },
      { id: 's5', type: 'database', name: 'Store Result', config: { table: 'tickets' }, position: { x: 0, y: 5 } },
      { id: 's6', type: 'notification', name: 'Notify Team', config: { channel: 'slack' }, position: { x: 0, y: 6 } },
    ],
    executions: 1247,
    successRate: 98.2,
    lastRun: '2024-03-15T14:32:00Z',
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-03-10T12:00:00Z'
  },
  {
    id: 'wf_002',
    name: 'Lead Qualification Pipeline',
    description: 'Score and qualify incoming leads using Python ML models, then route high-value leads to sales team.',
    status: 'active',
    trigger: { id: 't2', type: 'webhook', name: 'New Lead Webhook', config: { path: '/webhooks/new-lead' }, position: { x: 0, y: 0 } },
    steps: [
      { id: 's1', type: 'webhook', name: 'Receive Lead', config: {}, position: { x: 0, y: 1 } },
      { id: 's2', type: 'python', name: 'Lead Scoring', config: { endpoint: '/api/score' }, position: { x: 0, y: 2 } },
      { id: 's3', type: 'condition', name: 'Quality Gate', config: { field: 'score', operator: 'gte', value: 70 }, position: { x: 0, y: 3 } },
      { id: 's4', type: 'database', name: 'Store Lead', config: { table: 'leads' }, position: { x: 0, y: 4 } },
      { id: 's5', type: 'notification', name: 'Alert Sales', config: { channel: 'email' }, position: { x: 0, y: 5 } },
    ],
    executions: 856,
    successRate: 96.8,
    lastRun: '2024-03-15T13:45:00Z',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-12T09:00:00Z'
  },
  {
    id: 'wf_003',
    name: 'Error Monitoring & Alerting',
    description: 'Monitor automation failures, process error data, and notify administrators with detailed reports.',
    status: 'active',
    trigger: { id: 't3', type: 'schedule', name: 'Every 5 minutes', config: { cron: '*/5 * * * *' }, position: { x: 0, y: 0 } },
    steps: [
      { id: 's1', type: 'http_request', name: 'Check Failures', config: { url: '/api/executions?status=failed' }, position: { x: 0, y: 1 } },
      { id: 's2', type: 'python', name: 'Error Analysis', config: { endpoint: '/api/transform' }, position: { x: 0, y: 2 } },
      { id: 's3', type: 'database', name: 'Log Errors', config: { table: 'error_logs' }, position: { x: 0, y: 3 } },
      { id: 's4', type: 'notification', name: 'Alert Admin', config: { channel: 'slack' }, position: { x: 0, y: 4 } },
    ],
    executions: 4320,
    successRate: 99.9,
    lastRun: '2024-03-15T14:30:00Z',
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z'
  },
  {
    id: 'wf_004',
    name: 'n8n → PHP Legacy Integration',
    description: 'Connect n8n workflows to legacy PHP systems for customer data synchronization.',
    status: 'active',
    trigger: { id: 't4', type: 'webhook', name: 'Data Sync Webhook', config: { path: '/webhooks/data-sync' }, position: { x: 0, y: 0 } },
    steps: [
      { id: 's1', type: 'webhook', name: 'Receive Data', config: {}, position: { x: 0, y: 1 } },
      { id: 's2', type: 'http_request', name: 'PHP Service', config: { url: 'http://php-service/api/process' }, position: { x: 0, y: 2 } },
      { id: 's3', type: 'transform', name: 'Transform Data', config: {}, position: { x: 0, y: 3 } },
      { id: 's4', type: 'database', name: 'Update Records', config: { table: 'customers' }, position: { x: 0, y: 4 } },
    ],
    executions: 312,
    successRate: 94.5,
    lastRun: '2024-03-15T12:00:00Z',
    createdAt: '2024-02-10T16:00:00Z',
    updatedAt: '2024-03-08T11:00:00Z'
  },
  {
    id: 'wf_005',
    name: 'Zapier → AutoFlow Processing',
    description: 'Process incoming Zapier triggers through AutoFlow AI pipeline for intelligent data handling.',
    status: 'active',
    trigger: { id: 't5', type: 'webhook', name: 'Zapier Webhook', config: { path: '/webhooks/zapier' }, position: { x: 0, y: 0 } },
    steps: [
      { id: 's1', type: 'webhook', name: 'Zapier Trigger', config: {}, position: { x: 0, y: 1 } },
      { id: 's2', type: 'ai', name: 'AI Processing', config: { model: 'gpt-4', task: 'extract' }, position: { x: 0, y: 2 } },
      { id: 's3', type: 'python', name: 'Data Transform', config: { endpoint: '/api/transform' }, position: { x: 0, y: 3 } },
      { id: 's4', type: 'webhook_out', name: 'Return to Zapier', config: {}, position: { x: 0, y: 4 } },
    ],
    executions: 189,
    successRate: 97.3,
    lastRun: '2024-03-15T11:20:00Z',
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-03-14T16:00:00Z'
  },
  {
    id: 'wf_006',
    name: 'Make.com → Webhook → AI Pipeline',
    description: 'Receive events from Make.com scenarios, process through AI, and trigger follow-up actions.',
    status: 'inactive',
    trigger: { id: 't6', type: 'webhook', name: 'Make.com Webhook', config: { path: '/webhooks/make' }, position: { x: 0, y: 0 } },
    steps: [
      { id: 's1', type: 'webhook', name: 'Make Event', config: {}, position: { x: 0, y: 1 } },
      { id: 's2', type: 'ai', name: 'Sentiment Analysis', config: { model: 'gpt-4', task: 'sentiment' }, position: { x: 0, y: 2 } },
      { id: 's3', type: 'condition', name: 'Route by Sentiment', config: {}, position: { x: 0, y: 3 } },
      { id: 's4', type: 'notification', name: 'Notify', config: {}, position: { x: 0, y: 4 } },
    ],
    executions: 67,
    successRate: 91.0,
    lastRun: '2024-03-10T08:00:00Z',
    createdAt: '2024-03-01T12:00:00Z',
    updatedAt: '2024-03-10T08:00:00Z'
  }
];

export const mockExecutions: Execution[] = [
  {
    id: 'exec_001',
    workflowId: 'wf_001',
    workflowName: 'AI Customer Support Automation',
    status: 'success',
    startedAt: '2024-03-15T14:32:00Z',
    duration: 2340,
    trigger: 'Webhook',
    steps: [
      { id: 'es1', name: 'Receive Inquiry', type: 'webhook', status: 'success', duration: 45, input: { name: 'John', email: 'john@example.com', message: 'My internet is not working' }, output: { validated: true } },
      { id: 'es2', name: 'Validate Input', type: 'python', status: 'success', duration: 120, input: { name: 'John', email: 'john@example.com' }, output: { valid: true, sanitized: true } },
      { id: 'es3', name: 'AI Classification', type: 'ai', status: 'success', duration: 1800, input: { message: 'My internet is not working' }, output: { category: 'Technical Support', priority: 'High', sentiment: 'Negative' } },
      { id: 'es4', name: 'Priority Check', type: 'condition', status: 'success', duration: 15, input: { priority: 'High' }, output: { match: true, route: 'urgent' } },
      { id: 'es5', name: 'Store Result', type: 'database', status: 'success', duration: 89, input: { ticket: {} }, output: { id: 'TKT-4521', stored: true } },
      { id: 'es6', name: 'Notify Team', type: 'notification', status: 'success', duration: 271, input: { channel: 'slack', message: 'New urgent ticket' }, output: { sent: true, channel: '#support-urgent' } },
    ]
  },
  {
    id: 'exec_002',
    workflowId: 'wf_002',
    workflowName: 'Lead Qualification Pipeline',
    status: 'success',
    startedAt: '2024-03-15T14:28:00Z',
    duration: 1890,
    trigger: 'Webhook',
    steps: [
      { id: 'es1', name: 'Receive Lead', type: 'webhook', status: 'success', duration: 32 },
      { id: 'es2', name: 'Lead Scoring', type: 'python', status: 'success', duration: 1450, input: { company: 'Acme Corp', budget: '$50k' }, output: { score: 85, tier: 'enterprise' } },
      { id: 'es3', name: 'Quality Gate', type: 'condition', status: 'success', duration: 8 },
      { id: 'es4', name: 'Store Lead', type: 'database', status: 'success', duration: 67 },
      { id: 'es5', name: 'Alert Sales', type: 'notification', status: 'success', duration: 333 },
    ]
  },
  {
    id: 'exec_003',
    workflowId: 'wf_001',
    workflowName: 'AI Customer Support Automation',
    status: 'failed',
    startedAt: '2024-03-15T14:15:00Z',
    duration: 5200,
    trigger: 'Webhook',
    error: 'AI service timeout after retry',
    steps: [
      { id: 'es1', name: 'Receive Inquiry', type: 'webhook', status: 'success', duration: 38 },
      { id: 'es2', name: 'Validate Input', type: 'python', status: 'success', duration: 95 },
      { id: 'es3', name: 'AI Classification', type: 'ai', status: 'failed', duration: 5000, error: 'Connection timeout to OpenAI API' },
      { id: 'es4', name: 'Priority Check', type: 'condition', status: 'pending' },
      { id: 'es5', name: 'Store Result', type: 'database', status: 'pending' },
      { id: 'es6', name: 'Notify Team', type: 'notification', status: 'pending' },
    ]
  },
  {
    id: 'exec_004',
    workflowId: 'wf_003',
    workflowName: 'Error Monitoring & Alerting',
    status: 'success',
    startedAt: '2024-03-15T14:30:00Z',
    duration: 890,
    trigger: 'Schedule',
    steps: [
      { id: 'es1', name: 'Check Failures', type: 'http_request', status: 'success', duration: 234 },
      { id: 'es2', name: 'Error Analysis', type: 'python', status: 'success', duration: 456 },
      { id: 'es3', name: 'Log Errors', type: 'database', status: 'success', duration: 78 },
      { id: 'es4', name: 'Alert Admin', type: 'notification', status: 'success', duration: 122 },
    ]
  },
  {
    id: 'exec_005',
    workflowId: 'wf_004',
    workflowName: 'n8n → PHP Legacy Integration',
    status: 'running',
    startedAt: '2024-03-15T14:33:00Z',
    duration: 0,
    trigger: 'Webhook',
    steps: [
      { id: 'es1', name: 'Receive Data', type: 'webhook', status: 'success', duration: 28 },
      { id: 'es2', name: 'PHP Service', type: 'http_request', status: 'running', duration: 0 },
      { id: 'es3', name: 'Transform Data', type: 'transform', status: 'pending' },
      { id: 'es4', name: 'Update Records', type: 'database', status: 'pending' },
    ]
  }
];

export const mockIntegrations: Integration[] = [
  { id: 'int_001', name: 'n8n', category: 'Automation', icon: '⚡', status: 'connected', description: 'Workflow automation engine', lastSync: '2024-03-15T14:00:00Z' },
  { id: 'int_002', name: 'Make.com', category: 'Automation', icon: '🔗', status: 'connected', description: 'Visual integration platform', lastSync: '2024-03-15T12:00:00Z' },
  { id: 'int_003', name: 'Zapier', category: 'Automation', icon: '⚙️', status: 'connected', description: 'App integration platform', lastSync: '2024-03-15T10:00:00Z' },
  { id: 'int_004', name: 'OpenAI', category: 'AI', icon: '🤖', status: 'connected', description: 'GPT-4 AI processing', lastSync: '2024-03-15T14:30:00Z' },
  { id: 'int_005', name: 'Slack', category: 'Communication', icon: '💬', status: 'connected', description: 'Team notifications', lastSync: '2024-03-15T14:25:00Z' },
  { id: 'int_006', name: 'Google', category: 'OAuth', icon: '🔵', status: 'connected', description: 'Google Workspace integration', lastSync: '2024-03-15T09:00:00Z' },
  { id: 'int_007', name: 'GitHub', category: 'Development', icon: '🐙', status: 'connected', description: 'Repository management', lastSync: '2024-03-14T18:00:00Z' },
  { id: 'int_008', name: 'PostgreSQL', category: 'Database', icon: '🐘', status: 'connected', description: 'Primary database', lastSync: '2024-03-15T14:32:00Z' },
  { id: 'int_009', name: 'Microsoft', category: 'OAuth', icon: '🟦', status: 'disconnected', description: 'Microsoft 365 integration' },
  { id: 'int_010', name: 'Python Service', category: 'Processing', icon: '🐍', status: 'connected', description: 'Data processing & ML', lastSync: '2024-03-15T14:33:00Z' },
  { id: 'int_011', name: 'PHP Service', category: 'Legacy', icon: '🐘', status: 'connected', description: 'Legacy system bridge', lastSync: '2024-03-15T13:00:00Z' },
  { id: 'int_012', name: 'Redis', category: 'Cache', icon: '🔴', status: 'connected', description: 'Caching & queues', lastSync: '2024-03-15T14:33:00Z' },
];

export const mockWebhooks: Webhook[] = [
  { id: 'wh_001', name: 'Customer Support', url: '/webhooks/whk_a8f3b2c1d4e5', secret: 'sec_••••••••', method: 'POST', status: 'active', events: 1247, lastTriggered: '2024-03-15T14:32:00Z', workflowId: 'wf_001' },
  { id: 'wh_002', name: 'New Lead', url: '/webhooks/whk_b9g4c3d2e5f6', secret: 'sec_••••••••', method: 'POST', status: 'active', events: 856, lastTriggered: '2024-03-15T14:28:00Z', workflowId: 'wf_002' },
  { id: 'wh_003', name: 'Data Sync', url: '/webhooks/whk_c0h5d4e3f6g7', secret: 'sec_••••••••', method: 'POST', status: 'active', events: 312, lastTriggered: '2024-03-15T12:00:00Z', workflowId: 'wf_004' },
  { id: 'wh_004', name: 'Zapier Integration', url: '/webhooks/whk_d1i6e5f4g7h8', secret: 'sec_••••••••', method: 'POST', status: 'active', events: 189, lastTriggered: '2024-03-15T11:20:00Z', workflowId: 'wf_005' },
  { id: 'wh_005', name: 'Make.com Events', url: '/webhooks/whk_e2j7f6g5h8i9', secret: 'sec_••••••••', method: 'POST', status: 'inactive', events: 67, lastTriggered: '2024-03-10T08:00:00Z', workflowId: 'wf_006' },
];

export const mockApiEndpoints: ApiEndpoint[] = [
  { method: 'POST', path: '/api/auth/register', description: 'Register new user account', auth: false, category: 'Authentication' },
  { method: 'POST', path: '/api/auth/login', description: 'Login and receive JWT token', auth: false, category: 'Authentication' },
  { method: 'POST', path: '/api/auth/refresh', description: 'Refresh access token', auth: true, category: 'Authentication' },
  { method: 'POST', path: '/api/auth/oauth/:provider', description: 'Initiate OAuth 2.0 flow', auth: false, category: 'Authentication' },
  { method: 'GET', path: '/api/users', description: 'List all users (admin)', auth: true, category: 'Users' },
  { method: 'GET', path: '/api/users/:id', description: 'Get user by ID', auth: true, category: 'Users' },
  { method: 'PATCH', path: '/api/users/:id', description: 'Update user profile', auth: true, category: 'Users' },
  { method: 'DELETE', path: '/api/users/:id', description: 'Delete user (admin)', auth: true, category: 'Users' },
  { method: 'GET', path: '/api/workflows', description: 'List all workflows', auth: true, category: 'Workflows' },
  { method: 'POST', path: '/api/workflows', description: 'Create new workflow', auth: true, category: 'Workflows' },
  { method: 'GET', path: '/api/workflows/:id', description: 'Get workflow details', auth: true, category: 'Workflows' },
  { method: 'PUT', path: '/api/workflows/:id', description: 'Update workflow', auth: true, category: 'Workflows' },
  { method: 'DELETE', path: '/api/workflows/:id', description: 'Delete workflow', auth: true, category: 'Workflows' },
  { method: 'POST', path: '/api/workflows/:id/execute', description: 'Execute workflow manually', auth: true, category: 'Workflows' },
  { method: 'GET', path: '/api/workflows/:id/logs', description: 'Get workflow execution logs', auth: true, category: 'Workflows' },
  { method: 'POST', path: '/api/webhooks', description: 'Create webhook endpoint', auth: true, category: 'Webhooks' },
  { method: 'GET', path: '/api/webhooks', description: 'List webhooks', auth: true, category: 'Webhooks' },
  { method: 'POST', path: '/webhooks/:id', description: 'Receive webhook event (public)', auth: false, category: 'Webhooks' },
  { method: 'GET', path: '/api/executions', description: 'List executions', auth: true, category: 'Executions' },
  { method: 'GET', path: '/api/executions/:id', description: 'Get execution details', auth: true, category: 'Executions' },
  { method: 'GET', path: '/api/integrations', description: 'List integrations', auth: true, category: 'Integrations' },
  { method: 'POST', path: '/api/integrations/:id/connect', description: 'Connect integration', auth: true, category: 'Integrations' },
  { method: 'DELETE', path: '/api/integrations/:id/disconnect', description: 'Disconnect integration', auth: true, category: 'Integrations' },
  { method: 'GET', path: '/api/analytics', description: 'Get analytics data', auth: true, category: 'Analytics' },
  { method: 'GET', path: '/api/health', description: 'System health check', auth: false, category: 'System' },
];

export const dashboardStats = {
  totalWorkflows: 6,
  activeWorkflows: 5,
  executionsToday: 47,
  successfulExecutions: 44,
  failedExecutions: 3,
  apiRequests: 2847,
  webhookEvents: 1247,
  connectedApps: 10,
};

export const executionChartData = [
  { name: 'Mon', success: 38, failed: 2 },
  { name: 'Tue', success: 42, failed: 1 },
  { name: 'Wed', success: 35, failed: 4 },
  { name: 'Thu', success: 48, failed: 2 },
  { name: 'Fri', success: 52, failed: 3 },
  { name: 'Sat', success: 28, failed: 1 },
  { name: 'Sun', success: 44, failed: 3 },
];

export const apiRequestsData = [
  { name: '00:00', requests: 45 },
  { name: '04:00', requests: 23 },
  { name: '08:00', requests: 156 },
  { name: '12:00', requests: 289 },
  { name: '16:00', requests: 342 },
  { name: '20:00', requests: 178 },
  { name: '23:59', requests: 67 },
];
