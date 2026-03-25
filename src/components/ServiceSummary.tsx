import React from 'react';
import { MapPin, Clock, User, ClipboardList, Package, Camera, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceSummaryProps {
  data: any;
}

export default function ServiceSummary({ data }: ServiceSummaryProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-primary">Resumen del Servicio</h3>
      
      <div className="space-y-4">
        {/* Basic Info */}
        <div className="card bg-primary/5 border-none space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent text-white rounded-lg">
              <ClipboardList size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Tipo de Servicio</p>
              <p className="font-bold text-primary">{data.tipo_servicio}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent text-white rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Estado Final</p>
              <p className="font-bold text-primary capitalize">{data.estado_instalacion}</p>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary/40 uppercase tracking-widest px-1">
            <Package size={14} />
            Materiales
          </div>
          <div className="card space-y-2">
            {data.materiales.length > 0 ? data.materiales.map((m: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                <span className="font-medium text-primary">{m.nombre}</span>
                <span className="font-bold text-accent">x{m.cantidad}</span>
              </div>
            )) : (
              <p className="text-xs text-primary/40 italic">Sin materiales registrados</p>
            )}
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary/40 uppercase tracking-widest px-1">
            <Camera size={14} />
            Evidencia Fotográfica
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[...data.fotos_antes, ...data.fotos_despues].map((url, i) => (
              <div key={i} className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                <img src={url} alt="Evidencia" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Signature */}
        {data.firma && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary/40 uppercase tracking-widest px-1">
              <PenTool size={14} />
              Firma del Cliente
            </div>
            <div className="card p-2 bg-gray-50 flex items-center justify-center">
              <img src={data.firma} alt="Firma" className="max-h-24 object-contain" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
