import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowDown, Webhook, Clock, Globe, FileText, Code2, Brain, 
  Database, Mail, GitBranch, Repeat, Filter, Zap, Play, 
  Save, Settings, ChevronDown, Plus, Trash2
} from 'lucide-react';
import { mockWorkflows } from '../data/mockData';

const stepTypes = [
  { type: 'webhook', label: 'Webhook Trigger', icon: Webhook, color: 'bg-blue-500' },
  { type: 'schedule', label: 'Schedule', icon: Clock, color: 'bg-indigo-500' },
  { type: 'http_request', label: 'HTTP Request', icon: Globe, color: 'bg-cyan-500' },
  { type: 'python', label: 'Python Processing', icon: Code2, color: 'bg-green-500' },
  { type: 'ai', label: 'AI Processing', icon: Brain, color: 'bg-purple-500' },
  { type: 'database', label: 'Database', icon: Database, color: 'bg-amber-500' },
  { type: 'email', label: 'Email', icon: Mail, color: 'bg-pink-500' },
  { type: 'condition', label: 'Condition', icon: GitBranch, color: 'bg-orange-500' },
  { type: 'transform', label: 'Transform', icon: Code2, color: 'bg-teal-500' },
  { type: 'notification', label: 'Notification', icon: Zap, color: 'bg-red-500' },
  { type: 'loop', label: 'Loop', icon: Repeat, color: 'bg-violet-500' },
  { type: 'filter', label: 'Filter', icon: Filter, color: 'bg-slate-500' },
];

export default function WorkflowBuilder() {
  const { id } = useParams();
  const workflow = id ? mockWorkflows.find(w => w.id === id) : null;
  const [workflowName, setWorkflowName] = useState(workflow?.name || 'New Workflow');
  const [showAddStep, setShowAddStep] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const steps = workflow?.steps || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-2xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
          />
          <p className="text-slate-600 mt-1">
            {workflow ? `Last updated: ${new Date(workflow.updatedAt).toLocaleDateString()}` : 'Create your automation workflow'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50">
            <Settings className="w-4 h-4" /> Configure
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Save className="w-4 h-4" /> Save Workflow
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Play className="w-4 h-4" /> Test Run
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Workflow Canvas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex flex-col items-center">
              {/* Trigger */}
              <div className="w-full max-w-md">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Webhook className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-100">TRIGGER</p>
                      <p className="font-semibold">{workflow?.trigger.name || 'Webhook Trigger'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              {steps.map((step, i) => {
                const stepConfig = stepTypes.find(s => s.type === step.type);
                const Icon = stepConfig?.icon || Zap;
                const isSelected = selectedStep === step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <ArrowDown className="w-5 h-5 text-slate-300 my-2" />
                    <div
                      onClick={() => setSelectedStep(isSelected ? null : step.id)}
                      className={`w-full max-w-md cursor-pointer rounded-xl p-4 border-2 transition-all ${
                        isSelected ? 'border-violet-500 bg-violet-50 shadow-lg' : 'border-gray-200 bg-white hover:border-violet-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${stepConfig?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 font-medium uppercase">{step.type.replace('_', ' ')}</p>
                          <p className="font-semibold text-slate-900">{step.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Step {i + 1}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 rounded-lg p-3">
                              <p className="text-xs text-slate-500">Type</p>
                              <p className="text-sm font-medium text-slate-900">{step.type}</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-3">
                              <p className="text-xs text-slate-500">Config</p>
                              <p className="text-sm font-medium text-slate-900">{Object.keys(step.config).length} params</p>
                            </div>
                          </div>
                          {Object.keys(step.config).length > 0 && (
                            <div className="mt-3 bg-slate-900 rounded-lg p-3">
                              <pre className="text-xs text-green-400 overflow-auto">
                                {JSON.stringify(step.config, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add Step Button */}
              <ArrowDown className="w-5 h-5 text-slate-300 my-2" />
              <button
                onClick={() => setShowAddStep(!showAddStep)}
                className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-500 hover:border-violet-400 hover:text-violet-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Step</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step Library */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Step Library</h3>
            <div className="space-y-2">
              {stepTypes.map((st) => {
                const Icon = st.icon;
                return (
                  <div key={st.type} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                    <div className={`w-8 h-8 ${st.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Info */}
          {workflow && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Workflow Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className="text-green-600 font-medium">{workflow.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Executions</span>
                  <span className="font-medium">{workflow.executions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Success Rate</span>
                  <span className="font-medium">{workflow.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Steps</span>
                  <span className="font-medium">{workflow.steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Created</span>
                  <span className="font-medium">{new Date(workflow.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Play className="w-4 h-4" /> Execute Manually
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Save className="w-4 h-4" /> Duplicate Workflow
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" /> Delete Workflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
