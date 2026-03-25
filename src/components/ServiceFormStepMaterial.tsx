import React from 'react';
import MaterialSelector from '@/components/MaterialSelector';
import { Package, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepMaterialProps {
  materials: any[];
  onAdd: (nombre: string) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: any) => void;
  availableMaterials: string[];
}

export default function ServiceFormStepMaterial({ materials, onAdd, onRemove, onUpdate, availableMaterials }: ServiceFormStepMaterialProps) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">Materiales Utilizados</h3>
        <p className="text-sm text-primary/60 font-medium">
          Seleccione los materiales que utilizó durante el servicio.
        </p>
      </div>

      <div className="space-y-6">
        <MaterialSelector 
          materials={materials}
          onAdd={onAdd}
          onRemove={onRemove}
          onUpdate={onUpdate}
          availableMaterials={availableMaterials}
        />

        {materials.length === 0 && (
          <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3 border border-primary/10">
            <Info size={20} className="text-primary/40 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-primary/60 leading-relaxed">
              Si no utilizó materiales adicionales, puede continuar sin seleccionar ninguno.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
