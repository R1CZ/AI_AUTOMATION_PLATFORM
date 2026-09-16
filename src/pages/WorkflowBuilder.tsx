import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowDown, Webhook, Clock, Globe, Code2, Brain, 
  Database, Mail, GitBranch, Repeat, Filter, Zap, Play, 
  Save, Settings, ChevronDown, Plus, Trash2, Loader2, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workflow, setWorkflow] = useState<any>(null);
  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<any[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadWorkflow();
    }
  }, [id]);

  const loadWorkflow = async () => {
    try {
      setLoading(true);
      const result = await api.getWorkflow(id!);
      setWorkflow(result.data);
      setWorkflowName(result.data.name);
      setDescription(result.data.description || '');
      setSteps(result.data.steps || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflow');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const data = {
        name: workflowName,
        description,
        steps,
        trigger: { type: 'webhook', config: {} }
      };

      if (id) {
        await api.updateWorkflow(id, data);
      } else {
        const result = await api.createWorkflow(data);
        navigate(`/workflows/${result.data.id}`);
      }
      alert('Workflow saved successfully!');
    } catch (err) {
      alert('Failed to save workflow: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!id) {
      alert('Please save the workflow first before testing');
      return;
    }
    try {
      const result = await api.executeWorkflow(id, { test: true });
      alert(`Test execution started! Execution ID: ${result.data.id}`);
    } catch (err) {
      alert('Failed to execute workflow: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const addStep = (type: string) => {
    const stepConfig = stepTypes.find(s => s.type === type);
    const newStep = {
      id: `step_${Date.now()}`,
      type,
      name: stepConfig?.label || 'New Step',
      config: {},
      position: { x: 0, y: steps.length }
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(s => s.id !== stepId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Workflow</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button onClick={() => navigate('/workflows')} className="px-4 py-2 bg-violet-600 text-white rounded-lg">
            Back to Workflows
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-2xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
            placeholder="Workflow Name"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-slate-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full"
            placeholder="Add a description..."
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleTest}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Play className="w-4 h-4" /> Test Run
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Workflow'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
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
                      <p className="font-semibold">Webhook Trigger</p>
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
                          <button
                            onClick={(e) => { e.stopPropagation(); removeStep(step.id); }}
                            className="p-1 hover:bg-red-100 rounded text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="bg-slate-900 rounded-lg p-3">
                            <pre className="text-xs text-green-400 overflow-auto">
                              {JSON.stringify(step.config, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add Step Button */}
              <ArrowDown className="w-5 h-5 text-slate-300 my-2" />
              <div className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-500 mb-3 text-center">Add a step:</p>
                <div className="grid grid-cols-3 gap-2">
                  {stepTypes.slice(0, 6).map((st) => {
                    const Icon = st.icon;
                    return (
                      <button
                        key={st.type}
                        onClick={() => addStep(st.type)}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`w-8 h-8 ${st.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-slate-600">{st.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Library */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">All Step Types</h3>
            <div className="space-y-2">
              {stepTypes.map((st) => {
                const Icon = st.icon;
                return (
                  <button
                    key={st.type}
                    onClick={() => addStep(st.type)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200 w-full text-left"
                  >
                    <div className={`w-8 h-8 ${st.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
