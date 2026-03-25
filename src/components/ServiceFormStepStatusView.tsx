import React from 'react';
import InstallationStatusSelector from '@/components/InstallationStatusSelector';
import { AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepStatusViewProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function ServiceFormStepStatusView({ selected, onSelect }: ServiceFormStepStatusViewProps) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">Estado de la Instalación</h3>
        <p className="text-sm text-primary/60 font-medium">
          ¿Cómo quedó la instalación al finalizar el servicio?
        </p>
      </div>

      <div className="space-y-6">
        <InstallationStatusSelector 
          selected={selected}
          onSelect={onSelect}
        />

        {!selected && (
          <div className="bg-accent/5 p-4 rounded-xl flex items-start gap-3 border border-accent/10">
            <Info size={20} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-accent/80 leading-relaxed">
              Debe seleccionar el estado de la instalación para poder continuar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
