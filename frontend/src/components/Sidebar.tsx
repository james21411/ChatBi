import { Home, Database, Settings } from 'lucide-react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  FileText, 
  Sparkles, 
  Users, 
  Settings as SettingsIcon,
  Bell,
  HelpCircle,
  Archive
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onNavigate?: (view: string) => void;
  activeView?: string;
  onToggleAI?: () => void;
}

export function Sidebar({ onNavigate, activeView = 'dashboard', onToggleAI }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Accueil' },
    { id: 'data-sources', icon: Database, label: 'Sources' },
    { id: 'reports', icon: FileText, label: 'Rapports' },
    { id: 'analytics', icon: BarChart3, label: 'Analyses' },
    { id: 'cleaning', icon: FolderOpen, label: 'Nettoyage' },
    { id: 'ai-assistant', icon: Sparkles, label: 'Assistant IA', action: 'toggle-ai' },
    { id: 'settings', icon: SettingsIcon, label: 'Paramètres' },
  ];

  const bottomItems = [
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: 3 },
    { id: 'help', icon: HelpCircle, label: 'Aide' },
  ];

  return (
    <aside className="w-16 bg-blue-950 flex flex-col items-center py-4" style={{backgroundColor: '#172554'}}>
      {/* Logo */}
      <figure className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-6" style={{backgroundColor: '#2563eb'}}>
        <span className="text-white">N</span>
      </figure>

      {/* Menu principal */}
      <nav className="flex-1 flex flex-col items-center gap-2 w-full px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => item.action === 'toggle-ai' ? onToggleAI?.() : onNavigate?.(item.id)}
              className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-white hover:bg-blue-800'
              }`}
              title={item.label}
            >
              <Icon size={18} />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-blue-950 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-blue-800" style={{backgroundColor: '#172554', color: 'white', borderColor: '#1e3a8a'}}>
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--sidebar)]"></div>
              </div>

              {/* Indicateur actif */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600" style={{backgroundColor: '#2563eb'}}></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Menu du bas */}
      <div className="flex flex-col items-center gap-2 w-full px-2 border-t border-[var(--sidebar-border)] pt-3">
        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className="relative w-12 h-12 flex flex-col items-center justify-center text-white hover:bg-blue-800 rounded-lg transition-all group"
              title={item.label}
            >
              <Icon size={18} />

              {/* Badge de notification */}
              {item.badge && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] rounded-full flex items-center justify-center text-xs">
                  {item.badge}
                </div>
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-blue-950 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-blue-800" style={{backgroundColor: '#172554', color: 'white', borderColor: '#1e3a8a'}}>
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--sidebar)]"></div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}