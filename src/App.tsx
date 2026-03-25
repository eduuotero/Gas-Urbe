import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import { UserRole } from './types';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthProvider, useAuth } from './lib/AuthProvider';

// Pages
import Agenda from './pages/tecnico/Agenda';
import ServiceForm from './pages/tecnico/ServiceForm';
import Historial from './pages/tecnico/Historial';
import RealTimeMap from './pages/coordinador/RealTimeMap';
import GestionDiaria from './pages/coordinador/GestionDiaria';
import Dashboard from './pages/administrador/Dashboard';
import Catalogos from './pages/administrador/Catalogos';
import Clientes from './pages/administrador/Clientes';

// Login Component
const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async (role: UserRole) => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists, if not create it with the selected role
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          nombre: user.displayName || 'Usuario',
          email: user.email,
          role: role,
          activo: true,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error al iniciar sesión. Por favor intente de nuevo.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="card w-full max-w-md space-y-8 p-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center font-bold text-2xl text-white mx-auto shadow-lg">GU</div>
          <h2 className="text-2xl font-black text-primary tracking-tight">Gas Uribe</h2>
          <p className="text-primary/60 text-sm">Control de Mantenimiento Doméstico</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-3 pt-4">
          <button 
            onClick={() => handleGoogleLogin('tecnico')} 
            disabled={isLoggingIn}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            {isLoggingIn ? "Cargando..." : "Entrar como Técnico"}
          </button>
          <button 
            onClick={() => handleGoogleLogin('coordinador')} 
            disabled={isLoggingIn}
            className="w-full btn-accent py-4 text-lg flex items-center justify-center gap-2"
          >
            {isLoggingIn ? "Cargando..." : "Entrar como Coordinador"}
          </button>
          <button 
            onClick={() => handleGoogleLogin('administrador')} 
            disabled={isLoggingIn}
            className="w-full bg-white border-2 border-primary text-primary py-4 rounded-xl font-bold hover:bg-primary/5 transition-colors text-lg flex items-center justify-center gap-2"
          >
            {isLoggingIn ? "Cargando..." : "Entrar como Administrador"}
          </button>
        </div>
        
        <p className="text-center text-[10px] text-primary/40 font-bold uppercase tracking-widest">Digitalización Gas Uribe © 2026</p>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !userProfile) {
    return <Login />;
  }

  const userRole = userProfile.role as UserRole;

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
};

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
