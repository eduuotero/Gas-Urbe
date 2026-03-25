import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronRight, User, MapPin, Clock, CheckCircle2, XCircle, AlertCircle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GestionDiaria() {
  const [filter, setFilter] = useState('todos');

  const stats = [
    { label: 'Total', value: 45, color: 'bg-primary/5 text-primary' },
    { label: 'Completados', value: 28, color: 'bg-green-50 text-green-600' },
    { label: 'En Progreso', value: 12, color: 'bg-accent/10 text-accent' },
    { label: 'Pendientes', value: 5, color: 'bg-orange-50 text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Gestión Diaria de Servicios</h2>
          <p className="text-primary/60 text-sm">Monitoreo y asignación de servicios del día</p>
        </div>
        <button className="btn-accent flex items-center gap-2">
          <Plus size={20} />
          Servicio Urgente
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={cn("card border-none shadow-none flex flex-col items-center justify-center py-4", stat.color)}>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{stat.label}</span>
            <span className="text-2xl font-black">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 card flex items-center gap-3 py-2 px-4">
          <Search size={18} className="text-primary/40" />
          <input 
            type="text" 
            placeholder="Buscar por cliente, técnico o zona..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
        </div>
        <div className="flex gap-2 p-1 bg-primary/5 rounded-xl">
          {['todos', 'pendientes', 'completados'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                filter === f ? "bg-white text-accent shadow-sm" : "text-primary/50 hover:text-primary/80"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="card hover:border-accent/30 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  i % 3 === 0 ? "bg-green-100 text-green-600" : i % 3 === 1 ? "bg-accent/10 text-accent" : "bg-orange-100 text-orange-600"
                )}>
                  {i % 3 === 0 ? <CheckCircle2 size={24} /> : i % 3 === 1 ? <Clock size={24} /> : <AlertCircle size={24} />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors">Cliente Ejemplo {i}</h3>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-primary/5 text-primary/40 rounded-full">Zona Sur</span>
                  </div>
                  <p className="text-xs text-primary/70 flex items-center gap-1">
                    <MapPin size={12} className="text-accent" /> Calle Falsa 123, Col. Roma
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-primary/40 uppercase">
                      <User size={12} /> Técnico: Juan Pérez
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-primary/40 uppercase">
                      <Clock size={12} /> Programado: 10:00 AM
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end border-t md:border-t-0 pt-3 md:pt-0">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-bold text-primary/40 uppercase">Estatus</p>
                  <p className={cn(
                    "text-xs font-bold",
                    i % 3 === 0 ? "text-green-600" : i % 3 === 1 ? "text-accent" : "text-orange-600"
                  )}>
                    {i % 3 === 0 ? 'Completado' : i % 3 === 1 ? 'En Progreso' : 'Pendiente'}
                  </p>
                </div>
                <button className="p-2 hover:bg-primary/5 rounded-lg text-primary/40">
                  <MoreVertical size={20} />
                </button>
                <button className="btn-primary py-2 px-4 text-xs">Detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
