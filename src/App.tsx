import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
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
import { User } from './types';
import { mockUser } from './data/mockData';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  sidebarOpen: true,
  setSidebarOpen: () => {},
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = (email: string, _password: string): boolean => {
    // Simulated authentication - in production this would call the API
    if (email) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated: !!user, login, logout, sidebarOpen, setSidebarOpen }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
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
