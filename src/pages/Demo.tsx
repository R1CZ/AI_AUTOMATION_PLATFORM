import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Zap, Webhook, Brain, Database, Bell, 
  CheckCircle2, Play, Send, Loader2, Sparkles,
  ArrowRight, Bot, Mail, Users, Clock
} from 'lucide-react';

export default function Demo() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [webhookData, setWebhookData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'My internet connection is not working properly'
  });
  const [aiResult, setAiResult] = useState<any>(null);

  const steps = [
    {
      id: 0,
      title: '1. Webhook Receives Data',
      icon: Webhook,
      color: 'from-blue-500 to-cyan-500',
      description: 'External system sends customer inquiry via webhook'
    },
    {
      id: 1,
      title: '2. AI Analyzes Message',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'GPT-4 processes and classifies the message'
    },
    {
      id: 2,
      title: '3. Smart Routing',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      description: 'System routes to appropriate team based on priority'
    },
    {
      id: 3,
      title: '4. Team Notified',
      icon: Bell,
      color: 'from-green-500 to-emerald-500',
      description: 'Slack, Email, and Database updated instantly'
    }
  ];

  const runDemo = async () => {
    setIsRunning(true);
    setActiveStep(0);
    setAiResult(null);

    // Step 1: Webhook
    await new Promise(resolve => setTimeout(resolve, 1500));
    setActiveStep(1);

    // Step 2: AI Analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiResult({
      category: 'Technical Support',
      priority: 'High',
      sentiment: 'Negative',
      confidence: 0.94,
      processing_time: '1.8s'
    });
    setActiveStep(2);

    // Step 3: Routing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setActiveStep(3);

    // Step 4: Notifications
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 border border-violet-200 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Interactive Demo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            See AutoFlow AI in Action
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Watch how a customer inquiry gets processed automatically in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input & Controls */}
          <div className="space-y-6">
            {/* Webhook Input */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Webhook className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Webhook Payload</h3>
                  <p className="text-sm text-slate-500">Customer inquiry data</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Name</label>
                  <input
                    type="text"
                    value={webhookData.name}
                    onChange={(e) => setWebhookData({ ...webhookData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    disabled={isRunning}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={webhookData.email}
                    onChange={(e) => setWebhookData({ ...webhookData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    disabled={isRunning}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Message</label>
                  <textarea
                    value={webhookData.message}
                    onChange={(e) => setWebhookData({ ...webhookData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    disabled={isRunning}
                  />
                </div>
              </div>

              <button
                onClick={runDemo}
                disabled={isRunning}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Demo
                  </>
                )}
              </button>
            </div>

            {/* AI Result */}
            {aiResult && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">AI Analysis Result</h3>
                    <p className="text-sm text-slate-500">Processed in {aiResult.processing_time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-red-600 font-medium mb-1">Priority</p>
                    <p className="text-lg font-bold text-red-700">{aiResult.priority}</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-xs text-orange-600 font-medium mb-1">Category</p>
                    <p className="text-sm font-bold text-orange-700">{aiResult.category}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-600 font-medium mb-1">Sentiment</p>
                    <p className="text-sm font-bold text-yellow-700">{aiResult.sentiment}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-medium mb-1">Confidence</p>
                    <p className="text-lg font-bold text-green-700">{(aiResult.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Workflow Steps */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Automation Workflow</h3>
                <p className="text-sm text-slate-500">Watch each step execute</p>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const isCompleted = activeStep > step.id;

                return (
                  <div
                    key={step.id}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'border-violet-500 bg-violet-50 shadow-lg'
                        : isCompleted
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'animate-pulse' : ''
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-slate-600">{step.description}</p>
                        
                        {isActive && isRunning && (
                          <div className="mt-2 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-violet-600" />
                            <span className="text-xs text-violet-600 font-medium">Processing...</span>
                          </div>
                        )}

                        {isCompleted && (
                          <div className="mt-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600 font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-10 top-full w-0.5 h-4 bg-gray-300" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Notifications */}
            {activeStep === 3 && (
              <div className="mt-6 space-y-3 animate-fadeIn">
                <h4 className="font-semibold text-slate-900 mb-3">Notifications Sent</h4>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Slack: #support-urgent</p>
                    <p className="text-xs text-slate-500">🚨 New urgent ticket from {webhookData.name}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Email Sent</p>
                    <p className="text-xs text-slate-500">📧 Ticket TKT-{Math.floor(Math.random() * 9000) + 1000} created</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Database Updated</p>
                    <p className="text-xs text-slate-500">💾 Ticket stored in PostgreSQL</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {activeStep === 3 && !isRunning && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white shadow-2xl animate-fadeIn">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Automation Complete!</h2>
              <p className="text-lg text-green-100 mb-6">
                Customer inquiry processed in 4.3 seconds
              </p>

              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <p className="text-4xl font-bold">600x</p>
                  <p className="text-sm text-green-100">Faster than manual</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">4</p>
                  <p className="text-sm text-green-100">Steps automated</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">3</p>
                  <p className="text-sm text-green-100">Notifications sent</p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Automating
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={runDemo}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Run Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <Clock className="w-8 h-8 text-violet-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Real-Time Processing</h3>
            <p className="text-sm text-slate-600">
              Webhooks are processed instantly with sub-second response times
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <Brain className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-slate-600">
              GPT-4 analyzes and classifies messages with 94%+ accuracy
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <Zap className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Smart Routing</h3>
            <p className="text-sm text-slate-600">
              Automatic prioritization and team assignment based on context
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
