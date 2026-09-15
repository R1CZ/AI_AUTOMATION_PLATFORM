import { useState } from 'react';
import { Lock, Unlock, Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { mockApiEndpoints } from '../data/mockData';

export default function ApiDocs() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Authentication');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const categories = [...new Set(mockApiEndpoints.map(e => e.category))];
  const groupedEndpoints = categories.map(cat => ({
    category: cat,
    endpoints: mockApiEndpoints.filter(e => e.category === cat)
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

      {/* API Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-slate-500">Base URL</p>
          <code className="text-sm font-mono text-violet-700 bg-violet-50 px-2 py-1 rounded mt-1 inline-block">
            https://api.autoflow.ai
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

      {/* Authentication Example */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Authentication</h3>
        <p className="text-sm text-slate-600 mb-4">
          All authenticated endpoints require a Bearer token in the Authorization header.
          Obtain tokens via the /api/auth/login endpoint.
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
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
  "expires_in": 3600,
  "token_type": "Bearer"
}

# Use token in requests
GET /api/workflows
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`}</pre>
        </div>
      </div>

      {/* Endpoints by Category */}
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

      {/* Error Responses */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Error Responses</h3>
        <div className="space-y-3">
          {[
            { code: 400, name: 'Bad Request', desc: 'Invalid request body or parameters' },
            { code: 401, name: 'Unauthorized', desc: 'Missing or invalid authentication token' },
            { code: 403, name: 'Forbidden', desc: 'Insufficient permissions for this action' },
            { code: 404, name: 'Not Found', desc: 'Resource does not exist' },
            { code: 422, name: 'Unprocessable', desc: 'Validation failed for request data' },
            { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded' },
            { code: 500, name: 'Server Error', desc: 'Internal server error' },
          ].map((error) => (
            <div key={error.code} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-bold text-red-600 min-w-[40px]">{error.code}</span>
              <span className="text-sm font-medium text-slate-900 min-w-[120px]">{error.name}</span>
              <span className="text-sm text-slate-600">{error.desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-slate-900 rounded-lg p-4 overflow-auto">
          <pre className="text-sm text-green-400">{`{
  "error": {
    "code": 422,
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}`}</pre>
        </div>
      </div>
    </div>
  );
}
