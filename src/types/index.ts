export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  avatar?: string;
  createdAt: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  trigger: WorkflowStep;
  steps: WorkflowStep[];
  executions: number;
  successRate: number;
  lastRun?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: string;
  type: 'webhook' | 'schedule' | 'http_request' | 'python' | 'ai' | 'database' | 'email' | 'condition' | 'transform' | 'notification' | 'webhook_out' | 'loop' | 'filter';
  name: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface Execution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: 'success' | 'running' | 'failed' | 'cancelled';
  startedAt: string;
  duration: number;
  trigger: string;
  steps: ExecutionStep[];
  error?: string;
}

export interface ExecutionStep {
  id: string;
  name: string;
  type: string;
  status: 'success' | 'running' | 'failed' | 'pending';
  startedAt?: string;
  duration?: number;
  input?: any;
  output?: any;
  error?: string;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  lastSync?: string;
  config?: Record<string, any>;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  method: string;
  status: 'active' | 'inactive';
  events: number;
  lastTriggered?: string;
  workflowId?: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  auth: boolean;
  category: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}
