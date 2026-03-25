import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, ChevronRight, User, MapPin, Phone, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Catalogos() {
  const [activeTab, setActiveTab] = useState<'tecnicos' | 'materiales' | 'servicios' | 'zonas'>('tecnicos');

  const tabs = [
    { id: 'tecnicos', label: 'Técnicos', icon: User },
    { id: 'materiales', label: 'Materiales', icon: Filter },
    { id: 'servicios', label: 'Tipos de Servicio', icon: CheckCircle2 },
    { id: 'zonas', label: 'Zonas', icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Gestión de Catálogos</h2>
          <p className="text-primary/60 text-sm">Administra los recursos base del sistema</p>
        </div>
        <button className="btn-accent flex items-center gap-2">
          <Plus size={20} />
          Agregar Nuevo
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-primary/5 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-white text-accent shadow-sm" 
                : "text-primary/50 hover:text-primary/80"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="card flex items-center gap-3 py-2 px-4">
        <Search size={18} className="text-primary/40" />
        <input 
          type="text" 
          placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label}...`} 
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
        />
      </div>

      {/* Content Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary/40">
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Detalle</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeTab === 'tecnicos' && [1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 font-bold">TP</div>
                      <div>
                        <p className="text-sm font-bold text-primary">Técnico Pérez {i}</p>
                        <p className="text-xs text-primary/60">ID: #T-00{i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-primary/70 flex items-center gap-1"><MapPin size={12} /> Zona Norte</p>
                      <p className="text-xs text-primary/70 flex items-center gap-1"><Phone size={12} /> 551234567{i}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-green-100 text-green-700 rounded-full">Activo</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-primary/5 rounded-lg text-primary/40 hover:text-accent"><Edit2 size={18} /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-primary/40 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {activeTab === 'materiales' && [1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-primary">Material Ejemplo {i}</p>
                    <p className="text-xs text-primary/60">Unidad: Pieza</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-primary">$120.00 MXN</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-green-100 text-green-700 rounded-full">En Stock</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-primary/5 rounded-lg text-primary/40 hover:text-accent"><Edit2 size={18} /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-primary/40 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
