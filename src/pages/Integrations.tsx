import { useState } from 'react';
import { CheckCircle, XCircle, Settings, ExternalLink, Search, Plus } from 'lucide-react';
import { mockIntegrations } from '../data/mockData';

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(mockIntegrations.map(i => i.category))];
  
  const filtered = mockIntegrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || i.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integrations</h1>
          <p className="text-slate-600">Connect and manage your external services</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Integration
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-slate-500">Connected</p>
          <p className="text-2xl font-bold text-green-600">{mockIntegrations.filter(i => i.status === 'connected').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-slate-500">Disconnected</p>
          <p className="text-2xl font-bold text-slate-600">{mockIntegrations.filter(i => i.status === 'disconnected').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-900">{mockIntegrations.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                categoryFilter === cat ? 'bg-violet-100 text-violet-700' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{integration.icon}</div>
              <div className="flex items-center gap-1">
                {integration.status === 'connected' ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-slate-500 bg-gray-100 px-2 py-1 rounded-full">
                    <XCircle className="w-3 h-3" /> Disconnected
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{integration.name}</h3>
            <p className="text-sm text-slate-500 mb-1">{integration.description}</p>
            <p className="text-xs text-slate-400 mb-4">Category: {integration.category}</p>
            
            {integration.lastSync && (
              <p className="text-xs text-slate-400 mb-4">
                Last sync: {new Date(integration.lastSync).toLocaleString()}
              </p>
            )}

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              {integration.status === 'connected' ? (
                <>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-slate-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="w-3.5 h-3.5" /> Configure
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* OAuth Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">OAuth 2.0 Connections</h3>
        <p className="text-sm text-slate-600 mb-4">Manage OAuth providers and tokens for external service authentication.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { provider: 'Google', status: 'active', scopes: ['profile', 'email', 'calendar'] },
            { provider: 'GitHub', status: 'active', scopes: ['repo', 'user', 'webhooks'] },
            { provider: 'Slack', status: 'active', scopes: ['chat:write', 'channels:read'] },
            { provider: 'Microsoft', status: 'expired', scopes: ['User.Read', 'Mail.Send'] },
          ].map((oauth, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-900">{oauth.provider}</p>
                <p className="text-xs text-slate-500">Scopes: {oauth.scopes.join(', ')}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                oauth.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {oauth.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
