import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code2, Server, Database, Shield, Brain, Globe, Zap, Workflow } from 'lucide-react';

export default function Technology() {
  const technologies = [
    {
      name: 'n8n',
      icon: '⚡',
      category: 'Automation Engine',
      description: 'n8n serves as the core workflow automation engine. It processes multi-step workflows, handles scheduling, manages node execution, and provides visual workflow editing.',
      usage: [
        'Orchestrates complex multi-step automation workflows',
        'Provides webhook triggers and scheduled execution',
        'Connects to 300+ integrations natively',
        'Handles error recovery and retry logic',
        'Processes data between Python, PHP, and AI services',
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'REST APIs',
      icon: '🔌',
      category: 'Communication Layer',
      description: 'A complete RESTful API built with proper HTTP methods, JSON responses, pagination, authentication, rate limiting, and comprehensive error handling.',
      usage: [
        'All CRUD operations for workflows, users, and integrations',
        'Webhook endpoint management and event processing',
        'OAuth 2.0 token management endpoints',
        'Analytics and execution log retrieval',
        'Health check and system status endpoints',
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Webhooks',
      icon: '🔗',
      category: 'Event System',
      description: 'Real-time webhook system that receives external events, validates signatures with HMAC-SHA256, triggers workflows, and provides retry mechanisms.',
      usage: [
        'Receive events from external services (forms, APIs, apps)',
        'HMAC-SHA256 signature validation for security',
        'Automatic workflow triggering on event receipt',
        'Retry mechanism with exponential backoff',
        'Complete event logging with payload storage',
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'OAuth 2.0',
      icon: '🔐',
      category: 'Authentication',
      description: 'Secure authentication system with JWT tokens, OAuth 2.0 authorization flows, refresh tokens, role-based access control, and secure session management.',
      usage: [
        'User authentication with email/password + JWT',
        'OAuth 2.0 flows for Google, GitHub, Slack, Microsoft',
        'Access tokens with configurable expiration',
        'Refresh token rotation for security',
        'Role-based access: ADMIN, USER, VIEWER',
      ],
      color: 'from-violet-500 to-purple-500'
    },
    {
      name: 'Python',
      icon: '🐍',
      category: 'Data Processing & ML',
      description: 'Python microservice handling data processing, machine learning, text classification, lead scoring, sentiment analysis, and data transformation.',
      usage: [
        'AI text classification and intent detection',
        'Lead scoring with ML models',
        'Data validation and sanitization',
        'Sentiment analysis using NLP',
        'Data transformation and format conversion',
      ],
      color: 'from-yellow-500 to-green-500'
    },
    {
      name: 'Make.com',
      icon: '🔗',
      category: 'Integration Platform',
      description: 'Make.com (formerly Integromat) integration for connecting with thousands of apps through visual scenario building and webhook bridges.',
      usage: [
        'Connect AutoFlow to 1000+ external applications',
        'Visual scenario building for non-developers',
        'Webhook-based event forwarding',
        'Data transformation between platforms',
        'Scheduled data synchronization',
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Zapier',
      icon: '⚙️',
      category: 'App Integration',
      description: 'Zapier integration allowing AutoFlow to receive triggers from and send actions to any Zapier-connected application.',
      usage: [
        'Receive triggers from Zapier Zaps',
        'Process data through AutoFlow AI pipeline',
        'Return structured responses to Zapier',
        'Enable actions in 5000+ connected apps',
        'REST API-based Zapier integration',
      ],
      color: 'from-orange-500 to-amber-500'
    },
    {
      name: 'JavaScript/TypeScript',
      icon: '🟨',
      category: 'Frontend & Logic',
      description: 'React/TypeScript frontend providing the user interface, workflow builder, real-time monitoring, and client-side data transformations.',
      usage: [
        'Complete SPA with React and TypeScript',
        'Visual workflow builder with drag-and-drop',
        'Real-time execution monitoring',
        'Client-side data transformation (JavaScript nodes)',
        'Interactive dashboard with charts and analytics',
      ],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'PHP',
      icon: '🐘',
      category: 'Legacy Integration',
      description: 'PHP service bridging AutoFlow with legacy systems, processing customer records, and providing compatibility with existing PHP-based infrastructure.',
      usage: [
        'Legacy system data synchronization',
        'Customer record processing and transformation',
        'API proxy for older systems',
        'Data format conversion (XML ↔ JSON)',
        'Email processing and template rendering',
      ],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'AI / OpenAI',
      icon: '🤖',
      category: 'Intelligence Layer',
      description: 'AI processing layer using GPT-4 for text classification, sentiment analysis, intent detection, response generation, and data extraction.',
      usage: [
        'Customer inquiry classification',
        'Sentiment analysis for support tickets',
        'Intent detection and routing',
        'Automated response generation',
        'Lead quality assessment',
      ],
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'PostgreSQL',
      icon: '🐘',
      category: 'Database',
      description: 'Primary relational database storing all platform data including users, workflows, executions, webhooks, and audit logs with full migration support.',
      usage: [
        'User accounts and authentication data',
        'Workflow definitions and configurations',
        'Execution logs and step-by-step records',
        'Webhook events and payloads',
        'Audit trail and compliance logging',
      ],
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Docker',
      icon: '🐳',
      category: 'Infrastructure',
      description: 'Complete Docker Compose setup for running the entire platform locally or in production with all services containerized.',
      usage: [
        'Containerized frontend (Nginx + React)',
        'Backend API server container',
        'Python service container',
        'PHP service container',
        'PostgreSQL, Redis, and n8n containers',
      ],
      color: 'from-sky-500 to-blue-600'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Technology Stack</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            AutoFlow AI is built with a modern, production-grade technology stack.
            Each component serves a specific purpose in the automation pipeline.
          </p>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture Overview</h2>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <pre className="text-sm text-slate-700 overflow-auto font-mono leading-relaxed">{`
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  React/TypeScript SPA │ Workflow Builder │ Real-time Dashboard   │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API / WebSockets
┌────────────────────────────▼────────────────────────────────────┐
│                       API GATEWAY                                │
│  Authentication (JWT/OAuth) │ Rate Limiting │ Request Routing    │
└──┬─────────────┬──────────────┬──────────────┬─────────────────┘
   │             │              │              │
┌──▼──┐    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
│ n8n │    │ Python  │   │   PHP   │   │   AI    │
│Engine│   │Service  │   │ Service │   │Service  │
│     │    │(ML/NLP) │   │(Legacy) │   │(GPT-4) │
└──┬──┘    └────┬────┘   └────┬────┘   └────┬────┘
   │            │              │              │
┌──▼────────────▼──────────────▼──────────────▼─────────────────┐
│                      DATA LAYER                                 │
│  PostgreSQL │ Redis Cache │ Webhook Events │ Audit Logs         │
└─────────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   INTEGRATION LAYER                              │
│  Make.com │ Zapier │ Slack │ GitHub │ Google │ Custom APIs       │
└─────────────────────────────────────────────────────────────────┘
`}</pre>
          </div>
        </div>

        {/* Technology Cards */}
        <div className="space-y-8">
          {technologies.map((tech, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                    {tech.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">{tech.name}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{tech.category}</span>
                    </div>
                    <p className="text-slate-600 mb-4">{tech.description}</p>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">How it's used in AutoFlow AI:</h4>
                    <ul className="space-y-1.5">
                      {tech.usage.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Summary */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
          <p className="text-slate-300 mb-6">
            This project demonstrates practical, production-level experience with full-stack AI automation development:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-violet-300">Backend & APIs</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• RESTful API with proper HTTP methods & status codes</li>
                <li>• JWT + OAuth 2.0 authentication</li>
                <li>• Webhook system with signature validation</li>
                <li>• Rate limiting & error handling</li>
                <li>• PostgreSQL with migrations</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-violet-300">Automation & AI</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• n8n workflow engine integration</li>
                <li>• Python ML/data processing service</li>
                <li>• AI classification with GPT-4</li>
                <li>• Make.com & Zapier integrations</li>
                <li>• Real-time execution monitoring</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-violet-300">Frontend</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• React + TypeScript SPA</li>
                <li>• Visual workflow builder</li>
                <li>• Real-time dashboards with charts</li>
                <li>• Responsive design (mobile + desktop)</li>
                <li>• Professional SaaS UI/UX</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-violet-300">Infrastructure</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• Docker Compose deployment</li>
                <li>• Multi-language services (JS/Python/PHP)</li>
                <li>• Environment-based configuration</li>
                <li>• Automated testing suite</li>
                <li>• CI/CD ready architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
