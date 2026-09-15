import { useState } from 'react';
import { Webhook as WebhookIcon, Copy, Plus, ExternalLink, Activity, Key, Clock, CheckCircle } from 'lucide-react';
import { mockWebhooks } from '../data/mockData';

export default function Webhooks() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testPayload, setTestPayload] = useState(JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    message: "I need technical support with my account",
    priority: "high"
  }, null, 2));
  const [testResult, setTestResult] = useState<any>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const simulateTest = () => {
    setTestResult({
      status: 200,
      message: 'Webhook received successfully',
      execution_id: 'exec_test_' + Date.now(),
      workflow_triggered: 'AI Customer Support Automation',
      processing_time: '234ms',
      data: JSON.parse(testPayload)
    });
  };

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

      {/* Webhook Info Banner */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <WebhookIcon className="w-5 h-5 text-violet-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900">Webhook System</h3>
            <p className="text-sm text-slate-600 mt-1">
              Each webhook endpoint receives POST requests, validates signatures, stores events, 
              triggers associated workflows, and returns responses. All events are logged with full payloads.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Key className="w-3 h-3" /> HMAC-SHA256 signatures</span>
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Auto-retry on failure</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Event logging</span>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook List */}
      <div className="space-y-4">
        {mockWebhooks.map((webhook) => (
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
                    {webhook.method} {webhook.url}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(webhook.url, webhook.id + '-url')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {copiedId === webhook.id + '-url' && <span className="text-xs text-green-600">Copied!</span>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{webhook.events}</p>
                <p className="text-xs text-slate-500">events received</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-slate-500">Secret</p>
                <div className="flex items-center gap-1 mt-1">
                  <code className="text-xs text-slate-700 font-mono">{webhook.secret}</code>
                  <button 
                    onClick={() => copyToClipboard('whsec_' + webhook.id, webhook.id + '-secret')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">Last Triggered</p>
                <p className="text-sm text-slate-700 mt-1">
                  {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Actions</p>
                <div className="flex items-center gap-2 mt-1">
                  <button 
                    onClick={() => setShowTestModal(true)}
                    className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded hover:bg-violet-200 transition-colors"
                  >
                    Test
                  </button>
                  <button className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Example Payload Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Example Webhook Request</h3>
        <p className="text-sm text-slate-600 mb-4">Send a POST request to any webhook endpoint with the following format:</p>
        <div className="bg-slate-900 rounded-lg p-4 overflow-auto">
          <pre className="text-sm text-green-400">{`curl -X POST https://api.autoflow.ai/webhooks/whk_a8f3b2c1d4e5 \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: whsec_your_secret_here" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need technical support",
    "priority": "high"
  }'`}</pre>
        </div>
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-800 mb-2">Example Response (200 OK):</p>
          <div className="bg-slate-900 rounded-lg p-3 overflow-auto">
            <pre className="text-sm text-green-400">{`{
  "status": "success",
  "execution_id": "exec_abc123",
  "workflow_triggered": "AI Customer Support Automation",
  "message": "Webhook processed successfully"
}`}</pre>
          </div>
        </div>
      </div>

      {/* Test Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900">Test Webhook</h3>
              <p className="text-sm text-slate-600">Send a test payload to simulate a webhook event</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">Request Payload (JSON)</label>
                <textarea
                  value={testPayload}
                  onChange={(e) => setTestPayload(e.target.value)}
                  className="w-full h-40 p-3 bg-slate-900 text-green-400 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              {testResult && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Test Successful — Status {testResult.status}</span>
                  </div>
                  <pre className="text-xs text-slate-700 bg-white rounded p-2 overflow-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => { setShowTestModal(false); setTestResult(null); }} className="px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 rounded-lg">
                Close
              </button>
              <button onClick={simulateTest} className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                Send Test Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
