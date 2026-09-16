import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Settings, ExternalLink, Search, Plus, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const result = await api.getIntegrations();
      setIntegrations(result.data);
    } catch (err) {
      console.error('Failed to load integrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = integrations.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
      </div>
    );
  }

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

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search integrations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-slate-500">No integrations found. Configure your API credentials to connect services.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((integration) => (
            <div key={integration.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{integration.icon || '🔌'}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  integration.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {integration.status}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{integration.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{integration.description}</p>
              
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                {integration.status === 'connected' ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-slate-700 bg-gray-50 hover:bg-gray-100 rounded-lg">
                      <Settings className="w-3.5 h-3.5" /> Configure
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm text-white bg-violet-600 hover:bg-violet-700 rounded-lg">
                    <ExternalLink className="w-3.5 h-3.5" /> Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
