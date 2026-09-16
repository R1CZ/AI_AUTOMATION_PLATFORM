import { useState } from 'react';
import { Lock, Unlock, Copy, ChevronDown, ChevronRight } from 'lucide-react';

const apiEndpoints = [
  { method: 'POST', path: '/api/auth/register', description: 'Register new user account', auth: false, category: 'Authentication' },
  { method: 'POST', path: '/api/auth/login', description: 'Login and receive JWT token', auth: false, category: 'Authentication' },
  { method: 'POST', path: '/api/auth/refresh', description: 'Refresh access token', auth: true, category: 'Authentication' },
  { method: 'GET', path: '/api/workflows', description: 'List all workflows', auth: true, category: 'Workflows' },
  { method: 'POST', path: '/api/workflows', description: 'Create new workflow', auth: true, category: 'Workflows' },
  { method: 'GET', path: '/api/workflows/:id', description: 'Get workflow details', auth: true, category: 'Workflows' },
  { method: 'PUT', path: '/api/workflows/:id', description: 'Update workflow', auth: true, category: 'Workflows' },
  { method: 'DELETE', path: '/api/workflows/:id', description: 'Delete workflow', auth: true, category: 'Workflows' },
  { method: 'POST', path: '/api/workflows/:id/execute', description: 'Execute workflow manually', auth: true, category: 'Workflows' },
  { method: 'GET', path: '/api/executions', description: 'List executions', auth: true, category: 'Executions' },
  { method: 'GET', path: '/api/executions/:id', description: 'Get execution details', auth: true, category: 'Executions' },
  { method: 'POST', path: '/api/webhooks', description: 'Create webhook endpoint', auth: true, category: 'Webhooks' },
  { method: 'GET', path: '/api/webhooks', description: 'List webhooks', auth: true, category: 'Webhooks' },
  { method: 'POST', path: '/webhooks/:id', description: 'Receive webhook event (public)', auth: false, category: 'Webhooks' },
  { method: 'GET', path: '/api/integrations', description: 'List integrations', auth: true, category: 'Integrations' },
  { method: 'GET', path: '/api/analytics', description: 'Get analytics data', auth: true, category: 'Analytics' },
  { method: 'GET', path: '/api/health', description: 'System health check', auth: false, category: 'System' },
];

export default function ApiDocs() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Authentication');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const categories = [...new Set(apiEndpoints.map(e => e.category))];
  const groupedEndpoints = categories.map(cat => ({
    category: cat,
    endpoints: apiEndpoints.filter(e => e.category === cat)
  }));

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-700';
      case 'POST': return 'bg-blue-100 text-blue-700';
      case 'PUT': return 'bg-amber-100 text-amber-700';
      case 'PATCH': return 'bg-purple-100 text-purple-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">API Documentation</h1>
        <p className="text-slate-600">Complete REST API reference for AutoFlow AI platform</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-slate-500">Base URL</p>
          <code className="text-sm font-mono text-violet-700 bg-violet-50 px-2 py-1 rounded mt-1 inline-block">
            {import.meta.env.VITE_API_URL || 'http://localhost:3001'}
          </code>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-slate-500">Authentication</p>
          <p className="text-sm font-medium text-slate-900 mt-1">Bearer Token (JWT)</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-slate-500">Rate Limit</p>
          <p className="text-sm font-medium text-slate-900 mt-1">1000 req/min</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Authentication</h3>
        <p className="text-sm text-slate-600 mb-4">
          All authenticated endpoints require a Bearer token in the Authorization header.
        </p>
        <div className="bg-slate-900 rounded-lg p-4 overflow-auto">
          <pre className="text-sm text-green-400">{`# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}

# Response
{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
    "expires_in": 3600,
    "token_type": "Bearer"
  }
}

# Use token in requests
GET /api/workflows
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`}</pre>
        </div>
      </div>

      <div className="space-y-4">
        {groupedEndpoints.map(({ category, endpoints }) => (
          <div key={category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-slate-900">{category}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {endpoints.length} endpoints
                </span>
              </div>
              {expandedCategory === category ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>
            
            {expandedCategory === category && (
              <div className="border-t border-gray-100">
                {endpoints.map((endpoint, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${getMethodColor(endpoint.method)} min-w-[60px] text-center`}>
                      {endpoint.method}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <code className="text-sm font-mono text-slate-700">{endpoint.path}</code>
                      <button onClick={() => copyPath(endpoint.path)} className="p-1 hover:bg-gray-200 rounded">
                        <Copy className="w-3 h-3 text-slate-400" />
                      </button>
                      {copiedPath === endpoint.path && <span className="text-xs text-green-600">Copied!</span>}
                    </div>
                    <span className="text-sm text-slate-500 flex-1">{endpoint.description}</span>
                    {endpoint.auth ? (
                      <Lock className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Unlock className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
