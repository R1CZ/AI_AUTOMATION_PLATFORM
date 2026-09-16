import { Link } from 'react-router-dom';
import { 
  Zap, GitBranch, Webhook, Shield, Brain, Code2, 
  ArrowRight, CheckCircle2, Play, Globe, Database,
  Server, Cpu, Workflow, Bot
} from 'lucide-react';
import MarketingVideo from '../components/MarketingVideo';
import { getIntegrationLogo } from '../components/BrandLogos';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">AutoFlow AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How It Works</a>
            <a href="#integrations" className="text-sm text-slate-600 hover:text-slate-900">Integrations</a>
            <a href="#technology" className="text-sm text-slate-600 hover:text-slate-900">Technology</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 px-4 py-2">
              Sign In
            </Link>
            <Link to="/login" className="text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-lg transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full mb-8">
            <Bot className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">AI-Powered Business Automation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Automate Everything<br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              With Intelligence
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Connect your applications, process data with AI, and build powerful automation workflows.
            Integrate n8n, Python, PHP, webhooks, OAuth, and more in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-violet-600/25">
              Start Automating <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/demo"
              className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-semibold text-lg transition-all"
            >
              <Play className="w-5 h-5" /> Interactive Demo
            </Link>
          </div>

          {/* Hero Video */}
          <div id="demo-video" className="mt-16 relative">
            <MarketingVideo />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need to Automate</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A complete platform for building, deploying, and monitoring AI-powered business automations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Workflow, title: 'Visual Workflow Builder', desc: 'Drag-and-drop workflow creation with triggers, conditions, and actions. Build complex automations without code.' },
              { icon: Brain, title: 'AI Processing', desc: 'Built-in AI for text classification, sentiment analysis, intent detection, and response generation using GPT-4.' },
              { icon: Webhook, title: 'Webhook System', desc: 'Create secure webhook endpoints with signature validation, event logging, and automatic retry mechanisms.' },
              { icon: Shield, title: 'OAuth 2.0 Auth', desc: 'Secure authentication with JWT tokens, OAuth 2.0 flows, role-based access control, and API key management.' },
              { icon: Code2, title: 'Multi-Language Services', desc: 'Python for ML/data processing, PHP for legacy integration, JavaScript for frontend and transformations.' },
              { icon: Database, title: 'Full REST API', desc: 'Complete RESTful API with proper HTTP methods, pagination, rate limiting, and comprehensive documentation.' },
              { icon: Server, title: 'n8n Integration', desc: 'Real n8n workflow engine integration for complex multi-step automations with visual editing.' },
              { icon: Globe, title: 'Make.com & Zapier', desc: 'Connect with Make.com and Zapier for thousands of app integrations through webhook and API bridges.' },
              { icon: Cpu, title: 'Real-Time Monitoring', desc: 'Live execution tracking, error alerting, performance analytics, and detailed execution logs.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">From webhook trigger to intelligent action in milliseconds</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Trigger', desc: 'Webhook receives external event (form submission, API call, scheduled task)', color: 'from-blue-500 to-cyan-500' },
              { step: '02', title: 'Validate & Process', desc: 'Python service validates input, sanitizes data, and prepares for AI processing', color: 'from-violet-500 to-purple-500' },
              { step: '03', title: 'AI Analysis', desc: 'GPT-4 classifies content, detects intent, analyzes sentiment, generates response', color: 'from-pink-500 to-rose-500' },
              { step: '04', title: 'Route & Transform', desc: 'Conditional logic routes data, JavaScript transforms formats, PHP handles legacy systems', color: 'from-orange-500 to-amber-500' },
              { step: '05', title: 'Execute Actions', desc: 'Store in database, send notifications, trigger APIs, update external services', color: 'from-green-500 to-emerald-500' },
              { step: '06', title: 'Monitor & Log', desc: 'Real-time execution tracking, error handling, retry logic, and complete audit trail', color: 'from-slate-600 to-slate-800' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 mb-8 last:mb-0">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Connect Everything</h2>
          <p className="text-lg text-slate-400 mb-12">Integrate with your favorite tools and platforms</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'n8n' },
              { name: 'Make.com' },
              { name: 'Zapier' },
              { name: 'OpenAI' },
              { name: 'Slack' },
              { name: 'GitHub' },
              { name: 'Google' },
              { name: 'PostgreSQL' },
              { name: 'Python Service' },
              { name: 'PHP Service' },
              { name: 'Docker' },
              { name: 'Redis' },
            ].map((app, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-violet-500 transition-all flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  {getIntegrationLogo(app.name, 48)}
                </div>
                <p className="text-sm text-slate-300 font-medium">{app.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Automate?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Start building intelligent automations today. No credit card required.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-violet-600/25">
            Launch Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">AutoFlow AI</span>
            </div>
            <p className="text-sm">Intelligent Business Automation Platform</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Platform</h4>
            <div className="space-y-2 text-sm">
              <p>Workflows</p>
              <p>Integrations</p>
              <p>Webhooks</p>
              <p>API</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Technology</h4>
            <div className="space-y-2 text-sm">
              <p>n8n</p>
              <p>Python / PHP</p>
              <p>REST APIs</p>
              <p>OAuth 2.0</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Resources</h4>
            <div className="space-y-2 text-sm">
              <p>Documentation</p>
              <p>API Reference</p>
              <p>Webhook Guide</p>
              <p>Support</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-sm text-center">
          <p>© {new Date().getFullYear()} AutoFlow AI. Built with React, TypeScript, n8n, Python, PHP, and AI.</p>
        </div>
      </footer>
    </div>
  );
}
