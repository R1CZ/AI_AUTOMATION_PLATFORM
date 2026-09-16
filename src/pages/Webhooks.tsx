import { useState, useEffect } from 'react';
import { Webhook as WebhookIcon, Copy, Plus, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = async () => {
    try {
      const result = await api.getWebhooks();
      setWebhooks(result.data);
    } catch (err) {
      console.error('Failed to load webhooks:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          <h1 className="text-2xl font-bold text-slate-900">Webhooks</h1>
          <p className="text-slate-600">Manage webhook endpoints and test integrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" /> Create Webhook
        </button>
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <WebhookIcon className="w-5 h-5 text-violet-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900">Webhook System</h3>
            <p className="text-sm text-slate-600 mt-1">
              Create webhook endpoints to receive external events. Each webhook validates signatures, 
              triggers workflows, and logs all events.
            </p>
          </div>
        </div>
      </div>

      {webhooks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <WebhookIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No webhooks configured</h3>
          <p className="text-slate-500 mb-4">Create a webhook to start receiving external events</p>
        </div>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{webhook.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      webhook.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {webhook.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono">
                      POST {webhook.url_path}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(webhook.url_path, webhook.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    {copiedId === webhook.id && <span className="text-xs text-green-600">Copied!</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{webhook.event_count || 0}</p>
                  <p className="text-xs text-slate-500">events received</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
