import { useState } from 'react';
import { Users, GitBranch, Activity, AlertTriangle, Server, Shield, Eye, Ban, CheckCircle, XCircle } from 'lucide-react';
import { mockWorkflows, mockExecutions, dashboardStats } from '../data/mockData';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system'>('overview');

  const mockUsers = [
    { id: '1', name: 'Alex Johnson', email: 'alex@autoflow.ai', role: 'ADMIN', status: 'active', lastLogin: '2024-03-15T14:30:00Z' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@company.com', role: 'USER', status: 'active', lastLogin: '2024-03-15T12:00:00Z' },
    { id: '3', name: 'Mike Peters', email: 'mike@startup.io', role: 'USER', status: 'active', lastLogin: '2024-03-14T18:00:00Z' },
    { id: '4', name: 'Lisa Wang', email: 'lisa@enterprise.com', role: 'VIEWER', status: 'active', lastLogin: '2024-03-15T09:00:00Z' },
    { id: '5', name: 'Tom Brown', email: 'tom@old-client.com', role: 'USER', status: 'disabled', lastLogin: '2024-02-28T10:00:00Z' },
  ];

  const systemHealth = [
    { service: 'API Server', status: 'healthy', uptime: '99.99%', responseTime: '45ms' },
    { service: 'Python Service', status: 'healthy', uptime: '99.95%', responseTime: '120ms' },
    { service: 'PHP Service', status: 'healthy', uptime: '99.90%', responseTime: '89ms' },
    { service: 'PostgreSQL', status: 'healthy', uptime: '99.99%', responseTime: '12ms' },
    { service: 'Redis Cache', status: 'healthy', uptime: '99.99%', responseTime: '2ms' },
    { service: 'n8n Engine', status: 'healthy', uptime: '99.97%', responseTime: '234ms' },
    { service: 'AI Service (OpenAI)', status: 'degraded', uptime: '98.50%', responseTime: '1.2s' },
    { service: 'Webhook Receiver', status: 'healthy', uptime: '99.99%', responseTime: '28ms' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600">System administration and monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-medium">
            <CheckCircle className="w-3 h-3" /> All Systems Operational
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['overview', 'users', 'system'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Admin Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-500">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{mockUsers.length}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-5 h-5 text-violet-500" />
                <span className="text-sm text-slate-500">Total Workflows</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{mockWorkflows.length}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-sm text-slate-500">Executions Today</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{dashboardStats.executionsToday}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-slate-500">Failed Jobs</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{dashboardStats.failedExecutions}</p>
            </div>
          </div>

          {/* Recent Failed Executions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-slate-900">Failed Executions</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {mockExecutions.filter(e => e.status === 'failed').map((exec) => (
                <div key={exec.id} className="p-4 flex items-center gap-4">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{exec.workflowName}</p>
                    <p className="text-xs text-red-600">{exec.error}</p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(exec.startedAt).toLocaleString()}</span>
                </div>
              ))}
              {mockExecutions.filter(e => e.status === 'failed').length === 0 && (
                <div className="p-8 text-center text-slate-500">No failed executions</div>
              )}
            </div>
          </div>

          {/* API Usage */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">API Usage (Last 24h)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-xl font-bold text-blue-700">2,847</p>
                <p className="text-xs text-blue-600">Total Requests</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-xl font-bold text-green-700">2,791</p>
                <p className="text-xs text-green-600">Successful</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-xl font-bold text-red-700">56</p>
                <p className="text-xs text-red-600">Failed</p>
              </div>
              <div className="text-center p-3 bg-violet-50 rounded-lg">
                <p className="text-xl font-bold text-violet-700">45ms</p>
                <p className="text-xs text-violet-600">Avg Response</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">User Management</h3>
            <button className="text-sm px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
              Add User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Last Login</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-sm font-bold text-violet-600">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                        user.role === 'USER' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded" title="View">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded" title="Disable">
                          <Ban className="w-4 h-4 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-slate-900">System Health</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {systemHealth.map((service, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{service.service}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    service.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {service.status}
                  </span>
                  <span className="text-xs text-slate-500 min-w-[80px] text-right">Uptime: {service.uptime}</span>
                  <span className="text-xs text-slate-500 min-w-[80px] text-right">Latency: {service.responseTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Environment Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Environment</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Node.js', value: 'v20.11.0' },
                { label: 'Python', value: '3.11.7' },
                { label: 'PHP', value: '8.3.2' },
                { label: 'PostgreSQL', value: '16.1' },
                { label: 'Redis', value: '7.2.4' },
                { label: 'n8n', value: '1.29.0' },
                { label: 'Docker', value: '24.0.7' },
                { label: 'Environment', value: 'production' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="text-sm font-mono font-medium text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
