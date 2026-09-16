import { useState, useEffect } from 'react';
import { Users, GitBranch, Activity, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system'>('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load analytics
      const analytics = await api.getAnalytics();
      setStats(analytics.data);

      // Load users
      try {
        const usersData = await api.getUsers();
        setUsers(usersData.data);
      } catch (err) {
        // User management might not be available
        console.log('User management not available');
      }

      // Load health
      try {
        const healthData = await api.healthCheck();
        setHealth(healthData);
      } catch (err) {
        console.log('Health check failed');
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600">System administration and monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-medium">
            <CheckCircle className="w-3 h-3" /> System Operational
          </span>
        </div>
      </div>

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-500">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{users.length || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-5 h-5 text-violet-500" />
                <span className="text-sm text-slate-500">Total Workflows</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.workflows?.total || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-sm text-slate-500">Executions Today</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.executions?.today || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-slate-500">Failed Jobs</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.executions?.failed_today || 0}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-slate-900">User Management</h3>
          </div>
          {users.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No users found or user management not available</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">User</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Role</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-sm font-bold text-violet-600">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                          {user.role || 'USER'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                          active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-slate-900">System Health</h3>
            </div>
            {health ? (
              <div className="divide-y divide-gray-50">
                {health.services && Object.entries(health.services).map(([service, status]) => (
                  <div key={service} className="p-4 flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{service}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {String(status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">Health check unavailable</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
