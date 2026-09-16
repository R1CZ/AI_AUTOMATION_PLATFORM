import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, ChevronDown, ChevronRight, Filter, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function Executions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [executions, setExecutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExecutions();
  }, [statusFilter]);

  const loadExecutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = { limit: 50 };
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const result = await api.getExecutions(params);
      setExecutions(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load executions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executions</h1>
          <p className="text-slate-600">Monitor workflow execution history and logs</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {['all', 'success', 'running', 'failed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                statusFilter === status ? 'bg-violet-100 text-violet-700' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={loadExecutions} className="ml-auto text-sm text-red-700 underline">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
        </div>
      ) : executions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No executions found</h3>
          <p className="text-slate-500">Execute a workflow to see execution logs here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {executions.map((exec) => (
            <div key={exec.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div 
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === exec.id ? null : exec.id)}
              >
                {getStatusIcon(exec.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-slate-900">{exec.workflow_name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      exec.status === 'success' ? 'bg-green-100 text-green-700' :
                      exec.status === 'failed' ? 'bg-red-100 text-red-700' :
                      exec.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {exec.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Trigger: {exec.trigger_type} • Duration: {exec.duration_ms || 0}ms • {new Date(exec.started_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {exec.error_message && (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      {exec.error_message.substring(0, 30)}...
                    </span>
                  )}
                  {expandedId === exec.id ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {expandedId === exec.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Execution Steps</h4>
                  {exec.steps && exec.steps.length > 0 ? (
                    <div className="space-y-2">
                      {exec.steps.map((step: any, i: number) => (
                        <div key={step.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                          <div className="flex flex-col items-center">
                            {getStepStatusIcon(step.status)}
                            {i < exec.steps.length - 1 && (
                              <div className="w-0.5 h-6 bg-gray-200 mt-1" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-slate-900">{step.name}</p>
                              <span className="text-xs text-slate-400">{step.type}</span>
                            </div>
                            {step.duration_ms && step.duration_ms > 0 && (
                              <p className="text-xs text-slate-500 mt-0.5">Duration: {step.duration_ms}ms</p>
                            )}
                            {step.error_message && (
                              <p className="text-xs text-red-600 mt-1 bg-red-50 px-2 py-1 rounded">{step.error_message}</p>
                            )}
                            {step.output_data && (
                              <div className="mt-2 bg-slate-900 rounded-lg p-2">
                                <pre className="text-xs text-green-400 overflow-auto max-h-32">
                                  {JSON.stringify(step.output_data, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-4">No step details available</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
