import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Workflows from './pages/Workflows';
import WorkflowBuilder from './pages/WorkflowBuilder';
import Executions from './pages/Executions';
import Integrations from './pages/Integrations';
import Webhooks from './pages/Webhooks';
import ApiDocs from './pages/ApiDocs';
import AdminPanel from './pages/AdminPanel';
import Technology from './pages/Technology';
import Login from './pages/Login';
import Layout from './components/Layout';
import { AppContext } from './context/AppContext';
import { User } from './types';
import { api } from './services/api';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      // Try to validate token by fetching user data
      api.getWorkflows({ limit: 1 })
        .then(() => {
          // Token is valid, try to get user info
          setUser({
            id: 'user',
            name: 'User',
            email: 'user@autoflow.ai',
            role: 'USER',
            createdAt: new Date().toISOString()
          });
        })
        .catch(() => {
          // Token is invalid, clear it
          api.clearToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await api.login(email, password);
      setUser(result.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading AutoFlow AI...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ user, isAuthenticated: !!user, login, logout, sidebarOpen, setSidebarOpen }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/dashboard" element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
          <Route path="/workflows" element={user ? <Layout><Workflows /></Layout> : <Navigate to="/login" />} />
          <Route path="/workflows/new" element={user ? <Layout><WorkflowBuilder /></Layout> : <Navigate to="/login" />} />
          <Route path="/workflows/:id" element={user ? <Layout><WorkflowBuilder /></Layout> : <Navigate to="/login" />} />
          <Route path="/executions" element={user ? <Layout><Executions /></Layout> : <Navigate to="/login" />} />
          <Route path="/integrations" element={user ? <Layout><Integrations /></Layout> : <Navigate to="/login" />} />
          <Route path="/webhooks" element={user ? <Layout><Webhooks /></Layout> : <Navigate to="/login" />} />
          <Route path="/api-docs" element={user ? <Layout><ApiDocs /></Layout> : <Navigate to="/login" />} />
          <Route path="/admin" element={user ? <Layout><AdminPanel /></Layout> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
