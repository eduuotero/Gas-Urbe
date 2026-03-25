import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceTypeSelectorProps {
  types: string[];
  selected: string;
  onSelect: (type: string) => void;
}

export default function ServiceTypeSelector({ types, selected, onSelect }: ServiceTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-primary">¿Qué servicio realizaste?</h3>
      <div className="grid grid-cols-1 gap-3">
        {types.map((tipo) => (
          <button
            key={tipo}
            type="button"
            onClick={() => onSelect(tipo)}
            className={cn(
              "p-4 text-left rounded-xl border-2 transition-all font-bold text-lg flex items-center justify-between group",
              selected === tipo 
                ? "border-accent bg-accent/5 text-accent shadow-sm" 
                : "border-gray-100 hover:border-accent/30 text-primary hover:bg-primary/5"
            )}
          >
            {tipo}
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
              selected === tipo ? "border-accent bg-accent" : "border-gray-200"
            )}>
              {selected === tipo && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
