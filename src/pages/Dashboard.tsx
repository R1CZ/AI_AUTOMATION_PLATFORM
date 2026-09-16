import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GitBranch, Play, CheckCircle, XCircle, Zap, 
  Webhook, Plug, TrendingUp, Activity, Clock, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { api } from '../services/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [executions, setExecutions] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load analytics
      const analytics = await api.getAnalytics('week');
      setStats(analytics.data);

      // Load recent executions
      const execData = await api.getExecutions({ limit: 5 });
      setExecutions(execData.data);

      // Load active workflows
      const wfData = await api.getWorkflows({ status: 'active', limit: 5 });
      setWorkflows(wfData.data);

      // Generate chart data from analytics
      if (analytics.data.executions) {
        const dailyData = analytics.data.executions.daily || [];
        setChartData(dailyData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load Dashboard</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Workflows', value: stats?.workflows?.total || 0, icon: GitBranch, color: 'bg-violet-500' },
    { label: 'Active Workflows', value: stats?.workflows?.active || 0, icon: Play, color: 'bg-green-500' },
    { label: 'Executions Today', value: stats?.executions?.today || 0, icon: Activity, color: 'bg-blue-500' },
    { label: 'Success Rate', value: stats?.executions?.success_rate ? `${stats.executions.success_rate}%` : '0%', icon: CheckCircle, color: 'bg-emerald-500' },
    { label: 'Failed Today', value: stats?.executions?.failed_today || 0, icon: XCircle, color: 'bg-red-500' },
    { label: 'API Requests', value: stats?.api_requests?.total || 0, icon: Zap, color: 'bg-amber-500' },
    { label: 'Webhook Events', value: stats?.webhooks?.total_events || 0, icon: Webhook, color: 'bg-pink-500' },
    { label: 'Connected Apps', value: stats?.integrations?.connected || 0, icon: Plug, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Overview of your automation platform</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Execution Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Executions</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="success" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Successful" />
                <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-slate-400">
              No execution data available
            </div>
          )}
        </div>

        {/* API Requests Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">API Requests (Today)</h3>
          {stats?.api_requests?.hourly && stats.api_requests.hourly.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={stats.api_requests.hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="#eef2ff" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-slate-400">
              No API request data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity & Workflows */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Executions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Executions</h3>
            <Link to="/executions" className="text-sm text-violet-600 hover:text-violet-700 font-medium">View All →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {executions.length > 0 ? (
              executions.map((exec) => (
                <div key={exec.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    exec.status === 'success' ? 'bg-green-500' :
                    exec.status === 'failed' ? 'bg-red-500' :
                    exec.status === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{exec.workflow_name}</p>
                    <p className="text-xs text-slate-500">{exec.trigger} • {exec.duration_ms}ms</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    exec.status === 'success' ? 'bg-green-100 text-green-700' :
                    exec.status === 'failed' ? 'bg-red-100 text-red-700' :
                    exec.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {exec.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">No recent executions</div>
            )}
          </div>
        </div>

        {/* Active Workflows */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Active Workflows</h3>
            <Link to="/workflows" className="text-sm text-violet-600 hover:text-violet-700 font-medium">View All →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {workflows.length > 0 ? (
              workflows.map((wf) => (
                <div key={wf.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{wf.name}</p>
                    <p className="text-xs text-slate-500">{wf.execution_count} executions • {wf.success_rate}% success</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Active</span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">No active workflows</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
