import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Plus, Search, Filter, Play, Pause, MoreVertical, Zap, Clock, CheckCircle } from 'lucide-react';
import { mockWorkflows } from '../data/mockData';

export default function Workflows() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'draft'>('all');

  const filtered = mockWorkflows.filter(wf => {
    const matchesSearch = wf.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || wf.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workflows</h1>
          <p className="text-slate-600">Manage your automation workflows</p>
        </div>
        <Link to="/workflows/new" className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Workflow
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {(['all', 'active', 'inactive', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                filter === f ? 'bg-violet-100 text-violet-700' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((wf) => (
          <Link to={`/workflows/${wf.id}`} key={wf.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-violet-300 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-violet-600" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                wf.status === 'active' ? 'bg-green-100 text-green-700' :
                wf.status === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {wf.status}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-violet-700 transition-colors">{wf.name}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{wf.description}</p>
            
            {/* Steps preview */}
            <div className="flex items-center gap-1 mb-4">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Zap className="w-3 h-3" />
                {wf.steps.length} steps
              </div>
              <span className="text-slate-300 mx-1">•</span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Play className="w-3 h-3" />
                {wf.executions} runs
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {wf.successRate}% success
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {wf.lastRun ? new Date(wf.lastRun).toLocaleDateString() : 'Never'}
              </div>
            </div>
          </Link>
        ))}

        {/* Create New Card */}
        <Link to="/workflows/new" className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:border-violet-400 hover:bg-violet-50 transition-all min-h-[240px]">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-slate-400" />
          </div>
          <p className="font-medium text-slate-700">Create New Workflow</p>
          <p className="text-sm text-slate-500 mt-1">Build automation from scratch</p>
        </Link>
      </div>
    </div>
  );
}
