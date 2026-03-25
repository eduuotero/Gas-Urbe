import React from 'react';
import { CheckCircle2, RefreshCcw, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceFormSuccessProps {
  onBackToAgenda: () => void;
}

export default function ServiceFormSuccess({ onBackToAgenda }: ServiceFormSuccessProps) {
  return (
    <div className="fixed inset-0 bg-green-500 flex flex-col items-center justify-center text-white p-6 z-[100] animate-in fade-in duration-500">
      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <CheckCircle2 size={80} className="text-white" />
      </div>
      
      <div className="text-center space-y-4 max-w-sm">
        <h2 className="text-4xl font-black tracking-tight">¡Servicio Guardado!</h2>
        <p className="text-xl opacity-90 font-medium">
          La información y fotos se han sincronizado con Salesforce correctamente.
        </p>
      </div>

      <div className="mt-16 w-full max-w-xs space-y-4">
        <button 
          onClick={onBackToAgenda}
          className="w-full bg-white text-green-600 p-4 rounded-xl font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          Volver a mi Agenda
          <ChevronRight size={24} />
        </button>
        
        <div className="flex items-center justify-center gap-2 text-white/60">
          <RefreshCcw size={16} className="animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest">Sincronización completa</span>
        </div>
      </div>
    </div>
  );
}
