import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Clock, Info } from 'lucide-react';

interface StatusOption {
  label: string;
  value: string;
  color: string;
  icon: any;
}

const ESTADOS: StatusOption[] = [
  { label: 'Óptimo – sin observaciones', value: 'optimo', color: 'bg-green-500', icon: CheckCircle2 },
  { label: 'Requiere seguimiento (< 30 días)', value: 'seguimiento', color: 'bg-yellow-500', icon: Clock },
  { label: 'Requiere revisión urgente', value: 'urgente', color: 'bg-orange-500', icon: AlertCircle },
  { label: 'Se detectó irregularidad', value: 'irregularidad', color: 'bg-red-500', icon: Info }
];

interface InstallationStatusSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function InstallationStatusSelector({ selected, onSelect }: InstallationStatusSelectorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-primary">Estado de la Instalación</h3>
      <div className="grid grid-cols-1 gap-3">
        {ESTADOS.map((estado) => (
          <button
            key={estado.value}
            type="button"
            onClick={() => onSelect(estado.value)}
            className={cn(
              "p-4 text-left rounded-xl border-2 transition-all flex items-center gap-4 group",
              selected === estado.value 
                ? "border-accent bg-accent/5 shadow-sm" 
                : "border-gray-100 hover:border-accent/30 hover:bg-primary/5"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              selected === estado.value ? "bg-accent text-white" : "bg-primary/5 text-primary/40 group-hover:bg-accent/10 group-hover:text-accent"
            )}>
              <estado.icon size={24} />
            </div>
            <div className="flex-1">
              <span className={cn(
                "font-bold text-lg leading-tight block",
                selected === estado.value ? "text-accent" : "text-primary"
              )}>
                {estado.label}
              </span>
            </div>
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
              selected === estado.value ? "border-accent bg-accent" : "border-gray-200"
            )}>
              {selected === estado.value && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
