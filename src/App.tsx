import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useState } from 'react';
import { UserRole } from './types';

// Pages
import Agenda from './pages/tecnico/Agenda';
import ServiceForm from './pages/tecnico/ServiceForm';
import Historial from './pages/tecnico/Historial';
import RealTimeMap from './pages/coordinador/RealTimeMap';
import GestionDiaria from './pages/coordinador/GestionDiaria';
import Dashboard from './pages/administrador/Dashboard';
import Catalogos from './pages/administrador/Catalogos';
import Clientes from './pages/administrador/Clientes';

// Simple Login Component for Demo
const Login = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="card w-full max-w-md space-y-8 p-8">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg overflow-hidden p-2">
            <img 
              src="https://ais-pre-ym6k5njftqnotxyvg3lwod-348570396532.us-west2.run.app/logo.png" 
              alt="Gas Uribe Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if logo not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-primary text-2xl">GU</span>';
              }}
            />
          </div>
          <h2 className="text-2xl font-black text-primary tracking-tight">Gas Uribe</h2>
          <p className="text-primary/60 text-sm">Demo de Digitalización de Mantenimiento</p>
        </div>
        
        <div className="space-y-3 pt-4">
          <button 
            onClick={() => onLogin('tecnico')} 
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            Entrar como Técnico
          </button>
          <button 
            onClick={() => onLogin('coordinador')} 
            className="w-full btn-accent py-4 text-lg flex items-center justify-center gap-2"
          >
            Entrar como Coordinador
          </button>
          <button 
            onClick={() => onLogin('administrador')} 
            className="w-full bg-white border-2 border-primary text-primary py-4 rounded-xl font-bold hover:bg-primary/5 transition-colors text-lg flex items-center justify-center gap-2"
          >
            Entrar como Administrador
          </button>
        </div>
        
        <p className="text-center text-[10px] text-primary/40 font-bold uppercase tracking-widest">Digitalización Gas Uribe © 2026</p>
      </div>
    </div>
  );
};

export default function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  if (!userRole) {
    return <Login onLogin={setUserRole} />;
  }

  return (
    <Router>
      <Routes>
        {/* Technician Routes */}
        {userRole === 'tecnico' && (
          <>
            <Route path="/agenda" element={<Layout userRole="tecnico"><Agenda /></Layout>} />
            <Route path="/historial" element={<Layout userRole="tecnico"><Historial /></Layout>} />
            <Route path="/servicio/:id" element={<Layout userRole="tecnico"><ServiceForm /></Layout>} />
            <Route path="*" element={<Navigate to="/agenda" replace />} />
          </>
        )}

        {/* Coordinator Routes */}
        {userRole === 'coordinador' && (
          <>
            <Route path="/mapa" element={<Layout userRole="coordinador"><RealTimeMap /></Layout>} />
            <Route path="/gestion" element={<Layout userRole="coordinador"><GestionDiaria /></Layout>} />
            <Route path="*" element={<Navigate to="/mapa" replace />} />
          </>
        )}

        {/* Administrator Routes */}
        {userRole === 'administrador' && (
          <>
            <Route path="/dashboard" element={<Layout userRole="administrador"><Dashboard /></Layout>} />
            <Route path="/catalogos" element={<Layout userRole="administrador"><Catalogos /></Layout>} />
            <Route path="/clientes" element={<Layout userRole="administrador"><Clientes /></Layout>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={userRole === 'tecnico' ? "/agenda" : userRole === 'coordinador' ? "/mapa" : "/dashboard"} replace />} />
      </Routes>
    </Router>
  );
}
