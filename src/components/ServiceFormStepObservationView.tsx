import React from 'react';
import { Info, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepObservationViewProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ServiceFormStepObservationView({ value, onChange }: ServiceFormStepObservationViewProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">Observaciones (Opcional)</h3>
        <p className="text-sm text-primary/60 font-medium">
          Escriba cualquier detalle adicional que considere relevante para el expediente del cliente.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute top-4 left-4 text-primary/20 group-focus-within:text-accent transition-colors">
          <MessageSquare size={24} />
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 pl-12 rounded-2xl border-2 border-primary/5 bg-gray-50/50 min-h-[160px] text-primary font-medium focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all resize-none"
          placeholder="Ej: Se recomendó cambio de manguera en la próxima visita..."
        />
      </div>

      <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3 border border-primary/10">
        <Info size={20} className="text-primary/40 shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-primary/60 leading-relaxed">
          Este campo es opcional, pero ayuda a dar un mejor seguimiento al historial del cliente.
        </p>
      </div>
    </div>
  );
}
