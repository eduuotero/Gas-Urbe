import React from 'react';
import { MapPin, Clock, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  cliente: string;
  direccion: string;
  hora: string;
  tipo: string;
  estatus: string;
  onClick?: () => void;
  showIcon?: boolean;
}

export default function ServiceCard({ cliente, direccion, hora, tipo, estatus, onClick, showIcon = true }: ServiceCardProps) {
  return (
    <div 
      className="card hover:border-accent/30 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{tipo}</span>
            {estatus === 'completado' && (
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} /> Completado
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-primary leading-tight group-hover:text-accent transition-colors">{cliente}</h3>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary/70 text-sm">
              <MapPin size={16} className="text-accent shrink-0" />
              <span className="line-clamp-1">{direccion}</span>
            </div>
            <div className="flex items-center gap-2 text-primary/70 text-sm">
              <Clock size={16} className="text-accent shrink-0" />
              <span>{hora}</span>
            </div>
          </div>
        </div>

        {showIcon && (
          <div className="flex flex-col items-center justify-center gap-2 shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              {estatus === 'completado' ? (
                <ChevronRight size={24} className="text-primary/20 group-hover:text-accent" />
              ) : (
                <Play size={20} className="text-accent ml-1" />
              )}
            </div>
            <span className="text-[10px] font-bold text-primary/40 uppercase">
              {estatus === 'completado' ? 'Detalle' : 'Iniciar'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
