import { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, 
  Zap, Webhook, Brain, Database, Bell, CheckCircle2,
  ArrowRight, Sparkles, Bot, Mail, Users, TrendingUp
} from 'lucide-react';

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  duration: number;
  visual: React.ReactNode;
}

export default function MarketingVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const scenes: Scene[] = [
    {
      id: 0,
      title: "Customer Sends Inquiry",
      subtitle: "Webhook receives data instantly",
      duration: 4000,
      visual: <WebhookScene />
    },
    {
      id: 1,
      title: "AI Analyzes Message",
      subtitle: "GPT-4 processes in milliseconds",
      duration: 4000,
      visual: <AIScene />
    },
    {
      id: 2,
      title: "Smart Classification",
      subtitle: "Automatic routing & prioritization",
      duration: 4000,
      visual: <ClassificationScene />
    },
    {
      id: 3,
      title: "Team Gets Notified",
      subtitle: "Instant alerts via Slack & Email",
      duration: 4000,
      visual: <NotificationScene />
    },
    {
      id: 4,
      title: "Problem Solved",
      subtitle: "600x faster than manual processing",
      duration: 4000,
      visual: <SuccessScene />
    }
  ];

  // Intersection Observer for auto-play
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !isPlaying) {
          setIsPlaying(true);
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const sceneDuration = scenes[currentScene].duration;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const sceneProgress = Math.min(elapsed / sceneDuration, 1);
      setProgress(sceneProgress * 100);

      if (elapsed >= sceneDuration) {
        setCurrentScene((prev) => (prev + 1) % scenes.length);
        setProgress(0);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentScene]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div 
      ref={videoRef}
      className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Video Content */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20" />
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }} />
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Scene Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
          {scenes[currentScene].visual}
        </div>

        {/* Scene Title Overlay */}
        <div className="absolute bottom-24 left-0 right-0 text-center px-8">
          <div className="inline-block bg-black/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-1 animate-fadeIn">
              {scenes[currentScene].title}
            </h3>
            <p className="text-sm text-slate-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {scenes[currentScene].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Scene Indicators */}
          <div className="flex gap-1 mt-2">
            {scenes.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-0.5 rounded-full transition-all ${
                  i === currentScene ? 'bg-violet-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
            <span className="text-sm text-white/70">
              Scene {currentScene + 1} of {scenes.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-600/80 rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white">AI-Powered</span>
            </div>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-play Indicator */}
      {isVisible && isPlaying && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs text-white font-medium">LIVE DEMO</span>
        </div>
      )}
    </div>
  );
}

// Scene Components
function WebhookScene() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
          <Webhook className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-mono">POST /webhooks/customer-support</span>
        </div>
        <pre className="text-xs text-slate-300 font-mono overflow-hidden">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "My internet is not working"
}`}
        </pre>
      </div>

      <div className="flex items-center gap-2 text-slate-400">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm">Received in 45ms</span>
      </div>
    </div>
  );
}

function AIScene() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
          <Brain className="w-12 h-12 text-white animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-ping opacity-20" />
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
          <p className="text-xs text-slate-400">Input</p>
          <p className="text-sm text-white">"My internet is not working"</p>
        </div>
        <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse" />
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
          <p className="text-xs text-slate-400">AI Processing</p>
          <p className="text-sm text-purple-400">GPT-4 Analysis...</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['Analyzing', 'Classifying', 'Scoring'].map((step, i) => (
          <div
            key={i}
            className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassificationScene() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn">
      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/50">
        <Bot className="w-12 h-12 text-white" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center animate-scaleIn">
          <p className="text-2xl font-bold text-red-400 mb-1">HIGH</p>
          <p className="text-xs text-slate-400">Priority</p>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4 text-center animate-scaleIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-bold text-orange-400 mb-1">Technical</p>
          <p className="text-xs text-slate-400">Category</p>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center animate-scaleIn" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm font-bold text-yellow-400 mb-1">Negative</p>
          <p className="text-xs text-slate-400">Sentiment</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-slate-400">
        <Zap className="w-4 h-4 text-yellow-400" />
        <span className="text-sm">Classified in 1.8 seconds</span>
      </div>
    </div>
  );
}

function NotificationScene() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn">
      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/50">
        <Bell className="w-12 h-12 text-white animate-bounce" />
      </div>

      <div className="flex flex-col gap-3 max-w-md">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 animate-slideInRight">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Slack: #support-urgent</p>
              <p className="text-xs text-slate-400">🚨 New urgent ticket from John Doe</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Email: support@company.com</p>
              <p className="text-xs text-slate-400">📧 Ticket TKT-4521 created</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 animate-slideInRight" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Database: PostgreSQL</p>
              <p className="text-xs text-slate-400">💾 Ticket stored successfully</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessScene() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
          <CheckCircle2 className="w-16 h-16 text-white" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-20" />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Problem Solved!</h2>
        <p className="text-slate-300">Automated in 2.3 seconds</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-400">600x</p>
          <p className="text-xs text-slate-400">Faster</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-400">24/7</p>
          <p className="text-xs text-slate-400">Operation</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-400">100%</p>
          <p className="text-xs text-slate-400">Consistent</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span className="text-sm text-slate-300">Powered by AutoFlow AI</span>
      </div>
    </div>
  );
}
