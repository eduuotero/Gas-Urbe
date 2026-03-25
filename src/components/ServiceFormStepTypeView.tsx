import React from 'react';
import ServiceTypeSelector from '@/components/ServiceTypeSelector';
import { ClipboardList, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepTypeViewProps {
  types: string[];
  selected: string;
  onSelect: (type: string) => void;
}

export default function ServiceFormStepTypeView({ types, selected, onSelect }: ServiceFormStepTypeViewProps) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">¿Qué servicio realizaste?</h3>
        <p className="text-sm text-primary/60 font-medium">
          Seleccione el tipo de servicio principal que se llevó a cabo.
        </p>
      </div>

      <div className="space-y-6">
        <ServiceTypeSelector 
          types={types}
          selected={selected}
          onSelect={onSelect}
        />

        {!selected && (
          <div className="bg-accent/5 p-4 rounded-xl flex items-start gap-3 border border-accent/10">
            <Info size={20} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-accent/80 leading-relaxed">
              Debe seleccionar un tipo de servicio para poder continuar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
