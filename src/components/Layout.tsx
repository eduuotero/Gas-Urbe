import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, User, Map as MapIcon, ClipboardList, BarChart3, Settings, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'tecnico' | 'coordinador' | 'administrador';
}

export default function Layout({ children, userRole = 'tecnico' }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = {
    tecnico: [
      { label: 'Mi Agenda', icon: ClipboardList, path: '/agenda' },
      { label: 'Historial', icon: History, path: '/historial' },
    ],
    coordinador: [
      { label: 'Mapa Real-Time', icon: MapIcon, path: '/mapa' },
      { label: 'Gestión Diaria', icon: ClipboardList, path: '/gestion' },
    ],
    administrador: [
      { label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { label: 'Catálogos', icon: Settings, path: '/catalogos' },
      { label: 'Clientes', icon: User, path: '/clientes' },
    ],
  };

  const currentMenuItems = menuItems[userRole] || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-white">GU</div>
            <h1 className="font-bold text-lg tracking-tight hidden sm:block">Gas Uribe</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-6">
            {currentMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium hover:text-accent transition-colors",
                  location.pathname === item.path ? "text-accent" : "text-white/80"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Sidebar Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="w-64 h-full bg-surface p-4 flex flex-col gap-2" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-6 p-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-white">GU</div>
              <span className="font-bold text-primary">Gas Uribe</span>
            </div>
            {currentMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-accent/10 text-accent" 
                    : "text-primary/70 hover:bg-primary/5"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer (Mobile Navigation for Technician) */}
      {userRole === 'tecnico' && (
        <nav className="md:hidden bg-surface border-t border-gray-100 h-16 flex items-center justify-around sticky bottom-0 z-50">
          {currentMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                location.pathname === item.path ? "text-accent" : "text-primary/50"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
