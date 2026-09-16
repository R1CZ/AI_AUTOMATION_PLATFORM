/**
 * Brand Logo Components
 * Real SVG logos for integration services
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const N8nLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#EA4B71"/>
    <path d="M20 44V20h4.5l11 16.8h.2V20H40v24h-4.3L24.5 27.2h-.2V44H20z" fill="white"/>
  </svg>
);

export const MakeLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#6D00CC"/>
    <path d="M16 32c0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="6" fill="white"/>
    <circle cx="48" cy="32" r="4" fill="white"/>
  </svg>
);

export const ZapierLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#FF4A00"/>
    <path d="M38 16L22 34h12L26 48l16-18H30l8-14z" fill="white"/>
  </svg>
);

export const OpenAILogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#10A37F"/>
    <path d="M32 16c-2.5 0-4.8.7-6.8 1.9-1.5-.8-3.2-1.3-5-1.3-5.5 0-10 4.5-10 10 0 1.8.5 3.5 1.3 5-1.2 2-1.9 4.3-1.9 6.8 0 7.2 5.8 13 13 13 2.5 0 4.8-.7 6.8-1.9 1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10 0-1.8-.5-3.5-1.3-5 1.2-2 1.9-4.3 1.9-6.8 0-7.2-5.8-13-13-13z" fill="white" opacity="0.9"/>
    <path d="M32 22v20M22 32h20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const SlackLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#4A154B"/>
    <path d="M24 34c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4h4v4z" fill="#E01E5A"/>
    <path d="M26 24c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4v4h-4z" fill="#36C5F0"/>
    <path d="M40 30c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4h-4v-4z" fill="#2EB67D"/>
    <path d="M38 40c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4v-4h4z" fill="#ECB22E"/>
  </svg>
);

export const GitHubLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#24292F"/>
    <path d="M32 14c-9.9 0-18 8.1-18 18 0 7.9 5.1 14.7 12.2 17.1.9.2 1.2-.4 1.2-.9v-3.2c-5 1.1-6-2.4-6-2.4-.8-2.1-2-2.6-2-2.6-1.7-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.3 2 5.3 1.5.2-1.2.6-2 1.1-2.5-4-.5-8.2-2-8.2-8.9 0-2 .7-3.6 1.9-4.9-.2-.5-.8-2.3.2-4.8 0 0 1.5-.5 5 1.9 1.5-.4 3-.6 4.5-.6s3.1.2 4.5.6c3.5-2.4 5-1.9 5-1.9 1 2.5.4 4.3.2 4.8 1.2 1.3 1.9 2.9 1.9 4.9 0 6.9-4.2 8.4-8.2 8.9.6.6 1.2 1.7 1.2 3.4v5c0 .5.3 1.1 1.2.9C44.9 46.7 50 39.9 50 32c0-9.9-8.1-18-18-18z" fill="white"/>
  </svg>
);

export const GoogleLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
    <path d="M44.5 32.5c0-1.4-.1-2.7-.4-4H32v7.6h7c-.3 1.7-1.2 3.1-2.6 4.1v3.4h4.2c2.5-2.3 3.9-5.6 3.9-11.1z" fill="#4285F4"/>
    <path d="M32 45c3.5 0 6.4-1.2 8.6-3.1l-4.2-3.4c-1.2.8-2.7 1.3-4.4 1.3-3.4 0-6.3-2.3-7.3-5.4h-4.3v3.5C22.5 41.8 26.9 45 32 45z" fill="#34A853"/>
    <path d="M24.7 34.4c-.3-.8-.4-1.6-.4-2.4s.1-1.6.4-2.4v-3.5h-4.3c-.9 1.8-1.4 3.8-1.4 5.9s.5 4.1 1.4 5.9l4.3-3.5z" fill="#FBBC05"/>
    <path d="M32 22.2c1.9 0 3.6.7 5 1.9l3.7-3.7C38.4 18.3 35.5 17 32 17c-5.1 0-9.5 3.2-11.6 7.1l4.3 3.5c1-3.1 3.9-5.4 7.3-5.4z" fill="#EA4335"/>
  </svg>
);

export const PostgreSQLLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#336791"/>
    <path d="M38 18c-5 0-9 2.5-9 7v4h5v-3.5c0-2 1.5-3 3.5-3s3.5 1 3.5 3v11c0 2-1.5 3-3.5 3S34 38.5 34 36.5V34h-5v3c0 4.5 4 7 9 7s9-2.5 9-7V25c0-4.5-4-7-9-7z" fill="white"/>
    <circle cx="24" cy="42" r="3" fill="white" opacity="0.8"/>
  </svg>
);

export const PythonLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#3776AB"/>
    <path d="M32 16c-4 0-7 .5-7 3v5h9v1H22c-3 0-5 2.5-5 6s1.5 6 5 6h4v-4c0-3 2.5-5 5.5-5h8c2.5 0 4.5-2 4.5-4.5V19c0-2.5-3-3-7-3zm-5 2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#FFD43B"/>
    <path d="M32 48c4 0 7-.5 7-3v-5h-9v-1h12c3 0 5-2.5 5-6s-1.5-6-5-6h-4v4c0 3-2.5 5-5.5 5h-8c-2.5 0-4.5 2-4.5 4.5v4.5c0 2.5 3 3 7 3zm5-2.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#FFD43B"/>
  </svg>
);

export const PHPLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#777BB4"/>
    <path d="M24 26h-4l-2 12h3.5l1-6h2c2 0 3.5-1.5 3.5-3.5S26.5 26 24 26zm-.5 4.5h-1.5l.5-3h1.5c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5z" fill="white"/>
    <path d="M34 26h-6l-2 12h3.5l.5-3h2.5c3 0 5-2 5-5s-2-4-5-4zm-.5 7.5h-2l.5-3h2c1.5 0 2 .5 2 1.5s-.5 1.5-2 1.5z" fill="white"/>
    <path d="M46 26h-4l-2 12h3.5l.5-3h2.5c3 0 5-2 5-5s-2-4-5-4zm-.5 7.5h-2l.5-3h2c1.5 0 2 .5 2 1.5s-.5 1.5-2 1.5z" fill="white"/>
  </svg>
);

export const DockerLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#2496ED"/>
    <path d="M48 30h-4v-4h-4v4h-4v-4h-4v4h-4v-4h-4v4h-4c0 6 4 12 12 12h8c6 0 10-4 10-10v-2z" fill="white"/>
    <rect x="20" y="22" width="4" height="4" fill="white"/>
    <rect x="26" y="22" width="4" height="4" fill="white"/>
    <rect x="32" y="22" width="4" height="4" fill="white"/>
    <rect x="26" y="16" width="4" height="4" fill="white"/>
    <rect x="32" y="16" width="4" height="4" fill="white"/>
    <path d="M46 28c2-1 3-3 3-5-1 0-3 0-4 2-1-2-2-2-3-2 0 2 1 4 4 5z" fill="white"/>
  </svg>
);

export const RedisLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="#DC382D"/>
    <path d="M16 32l16-8 16 8-16 8-16-8z" fill="white" opacity="0.9"/>
    <path d="M16 38l16 8 16-8" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
    <path d="M16 44l16 8 16-8" stroke="white" strokeWidth="2" fill="none" opacity="0.5"/>
    <path d="M16 26l16-8 16 8" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
  </svg>
);

export const MicrosoftLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
    <rect width="64" height="64" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
    <rect x="16" y="16" width="14" height="14" fill="#F25022"/>
    <rect x="34" y="16" width="14" height="14" fill="#7FBA00"/>
    <rect x="16" y="34" width="14" height="14" fill="#00A4EF"/>
    <rect x="34" y="34" width="14" height="14" fill="#FFB900"/>
  </svg>
);

// Logo mapping by integration name
export const getIntegrationLogo = (name: string, size: number = 32) => {
  const logos: Record<string, React.FC<LogoProps>> = {
    'n8n': N8nLogo,
    'Make.com': MakeLogo,
    'Zapier': ZapierLogo,
    'OpenAI': OpenAILogo,
    'Slack': SlackLogo,
    'GitHub': GitHubLogo,
    'Google': GoogleLogo,
    'PostgreSQL': PostgreSQLLogo,
    'Python Service': PythonLogo,
    'PHP Service': PHPLogo,
    'Docker': DockerLogo,
    'Redis': RedisLogo,
    'Microsoft': MicrosoftLogo,
  };
  
  const LogoComponent = logos[name];
  return LogoComponent ? <LogoComponent size={size} /> : null;
};
