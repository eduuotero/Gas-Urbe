import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MaterialItem {
  nombre: string;
  cantidad: number;
  serie?: string;
}

interface MaterialSelectorProps {
  materials: MaterialItem[];
  onAdd: (nombre: string) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof MaterialItem, value: any) => void;
  availableMaterials: string[];
}

export default function MaterialSelector({ materials, onAdd, onRemove, onUpdate, availableMaterials }: MaterialSelectorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-primary">Materiales Utilizados</h3>
      <div className="space-y-3">
        {materials.map((field, index) => (
          <div key={index} className="card flex items-center gap-3 p-3 border-accent/20 bg-accent/5 animate-in slide-in-from-left-4 duration-200">
            <div className="flex-1">
              <p className="font-bold text-primary">{field.nombre}</p>
              <div className="flex gap-2 mt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Cant.</label>
                  <input
                    type="number"
                    value={field.cantidad}
                    onChange={(e) => onUpdate(index, 'cantidad', parseInt(e.target.value) || 0)}
                    className="w-20 p-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                  />
                </div>
                {field.nombre === 'Medidor' && (
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">N/S Medidor</label>
                    <input
                      type="text"
                      value={field.serie || ''}
                      onChange={(e) => onUpdate(index, 'serie', e.target.value)}
                      placeholder="Ej: M-12345"
                      className="w-full p-2 rounded-lg border border-gray-200 text-sm font-mono focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => onRemove(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        
        <div className="grid grid-cols-2 gap-2">
          {availableMaterials.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onAdd(m)}
              className="p-3 text-sm font-bold text-primary/70 border border-gray-100 rounded-lg hover:border-accent hover:text-accent hover:bg-accent/5 transition-all flex items-center gap-2 group"
            >
              <Plus size={16} className="group-hover:scale-125 transition-transform" />
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
