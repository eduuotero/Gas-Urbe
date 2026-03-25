import React from 'react';
import { Search, Plus, Filter, ChevronRight, User, MapPin, Phone, History, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Clientes() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Gestión de Clientes</h2>
          <p className="text-primary/60 text-sm">Base de datos de clientes y sincronización con Salesforce</p>
        </div>
        <button className="btn-accent flex items-center gap-2">
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="card flex items-center gap-3 py-2 px-4">
        <Search size={18} className="text-primary/40" />
        <input 
          type="text" 
          placeholder="Buscar por nombre, dirección o contrato Salesforce..." 
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
        />
        <button className="p-2 hover:bg-primary/5 rounded-lg text-primary/60">
          <Filter size={18} />
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card hover:border-accent/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 font-bold text-xl">
                C{i}
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Sincronizado
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-primary group-hover:text-accent transition-colors">Cliente de Prueba {i}</h3>
                <p className="text-xs text-primary/40 font-bold uppercase tracking-widest">Contrato: #SF-88231{i}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-primary/70">
                  <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                  <span>Calle Ejemplo {i}, Col. Roma Norte, CDMX</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-primary/70">
                  <Phone size={14} className="text-accent shrink-0" />
                  <span>55 1234 567{i}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button className="text-xs font-bold text-primary/60 hover:text-accent flex items-center gap-1 transition-colors">
                  <History size={14} />
                  Ver Historial
                </button>
                <button className="text-xs font-bold text-primary/60 hover:text-accent flex items-center gap-1 transition-colors">
                  <ExternalLink size={14} />
                  Salesforce
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button className="p-2 rounded-lg border border-gray-200 text-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-50" disabled>Anterior</button>
        <div className="flex gap-1">
          {[1, 2, 3].map(p => (
            <button key={p} className={cn(
              "w-10 h-10 rounded-lg font-bold text-sm transition-all",
              p === 1 ? "bg-accent text-white" : "hover:bg-primary/5 text-primary/60"
            )}>
              {p}
            </button>
          ))}
        </div>
        <button className="p-2 rounded-lg border border-gray-200 text-primary/60 hover:bg-primary/5 transition-colors">Siguiente</button>
      </div>
    </div>
  );
}
