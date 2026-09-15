import { 
  GitBranch, Play, CheckCircle, XCircle, Zap, 
  Webhook, Plug, TrendingUp, Activity, Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { dashboardStats, executionChartData, apiRequestsData, mockExecutions, mockWorkflows } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Total Workflows', value: dashboardStats.totalWorkflows, icon: GitBranch, color: 'bg-violet-500', change: '+2 this week' },
    { label: 'Active Workflows', value: dashboardStats.activeWorkflows, icon: Play, color: 'bg-green-500', change: '5 running' },
    { label: 'Executions Today', value: dashboardStats.executionsToday, icon: Activity, color: 'bg-blue-500', change: '+12% vs yesterday' },
    { label: 'Success Rate', value: '98.2%', icon: CheckCircle, color: 'bg-emerald-500', change: '+0.3%' },
    { label: 'Failed Today', value: dashboardStats.failedExecutions, icon: XCircle, color: 'bg-red-500', change: '-2 vs yesterday' },
    { label: 'API Requests', value: '2,847', icon: Zap, color: 'bg-amber-500', change: '+340 today' },
    { label: 'Webhook Events', value: '1,247', icon: Webhook, color: 'bg-pink-500', change: 'Active' },
    { label: 'Connected Apps', value: dashboardStats.connectedApps, icon: Plug, color: 'bg-indigo-500', change: '10 active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Overview of your automation platform</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          Last updated: just now
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-xs text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Execution Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Executions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={executionChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="success" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Successful" />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* API Requests Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">API Requests (Today)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={apiRequestsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="#eef2ff" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
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
            {mockExecutions.slice(0, 5).map((exec) => (
              <div key={exec.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  exec.status === 'success' ? 'bg-green-500' :
                  exec.status === 'failed' ? 'bg-red-500' :
                  exec.status === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{exec.workflowName}</p>
                  <p className="text-xs text-slate-500">{exec.trigger} • {exec.duration}ms</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  exec.status === 'success' ? 'bg-green-100 text-green-700' :
                  exec.status === 'failed' ? 'bg-red-100 text-red-700' :
                  exec.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {exec.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Workflows */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Active Workflows</h3>
            <Link to="/workflows" className="text-sm text-violet-600 hover:text-violet-700 font-medium">View All →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {mockWorkflows.filter(w => w.status === 'active').map((wf) => (
              <div key={wf.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GitBranch className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{wf.name}</p>
                  <p className="text-xs text-slate-500">{wf.executions} executions • {wf.successRate}% success</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
