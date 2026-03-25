import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (s: string) => {
    switch (s.toLowerCase()) {
      case 'completado':
      case 'optimo':
      case 'sincronizado':
      case 'activo':
      case 'disponible':
        return { label: s, color: 'bg-green-100 text-green-700' };
      case 'en_servicio':
      case 'en_progreso':
      case 'seguimiento':
        return { label: s.replace('_', ' '), color: 'bg-yellow-100 text-yellow-700' };
      case 'pendiente':
      case 'urgente':
        return { label: s, color: 'bg-orange-100 text-orange-700' };
      case 'cancelado':
      case 'irregularidad':
      case 'sin_senal':
      case 'inactivo':
        return { label: s.replace('_', ' '), color: 'bg-red-100 text-red-700' };
      default:
        return { label: s, color: 'bg-gray-100 text-gray-700' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn(
      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap",
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}
