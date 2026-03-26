import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, ChevronRight, Calendar, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceReport {
  id: string;
  id_cliente: string;
  cliente_nombre?: string;
  tipo_servicio: string;
  fecha: string;
  estatus: string;
  sincronizado_salesforce: boolean;
}

const MOCK_REPORTS: ServiceReport[] = [
  {
    id: 'SRV-001',
    id_cliente: 'CLI-101',
    cliente_nombre: 'Juan Pérez',
    tipo_servicio: 'Revisión general',
    fecha: '2026-03-25',
    estatus: 'completado',
    sincronizado_salesforce: true
  },
  {
    id: 'SRV-002',
    id_cliente: 'CLI-102',
    cliente_nombre: 'María García',
    tipo_servicio: 'Cambio de medidor',
    fecha: '2026-03-25',
    estatus: 'completado',
    sincronizado_salesforce: true
  },
  {
    id: 'SRV-003',
    id_cliente: 'CLI-103',
    cliente_nombre: 'Roberto Sánchez',
    tipo_servicio: 'Reparación de fuga',
    fecha: '2026-03-24',
    estatus: 'completado',
    sincronizado_salesforce: true
  }
];

export default function Historial() {
  const [reports] = useState<ServiceReport[]>(MOCK_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report => 
    report.tipo_servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (report.cliente_nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-primary">Mi Historial</h2>
        <p className="text-primary/60 text-sm">Servicios completados recientemente</p>
      </div>

      {/* Search and Date Filter */}
      <div className="flex gap-2">
        <div className="flex-1 card flex items-center gap-3 py-2 px-4">
          <Search size={18} className="text-primary/40" />
          <input 
            type="text" 
            placeholder="Buscar por servicio..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
        </div>
        <button className="card p-3 text-primary/60 hover:text-accent transition-colors">
          <Calendar size={20} />
        </button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="card hover:border-accent/30 transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{report.tipo_servicio}</span>
                  <span className="text-[10px] font-bold text-primary/40 uppercase">{report.fecha}</span>
                </div>
                
                <h3 className="text-lg font-bold text-primary leading-tight">Servicio #{report.id}</h3>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <MapPin size={16} className="text-accent" />
                    <span>Cliente: {report.cliente_nombre}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <CheckCircle2 size={16} className={cn(report.sincronizado_salesforce ? "text-green-500" : "text-yellow-500")} />
                    <span className={cn("font-bold", report.sincronizado_salesforce ? "text-green-600" : "text-yellow-600")}>
                      {report.sincronizado_salesforce ? "Sincronizado con Salesforce" : "Pendiente de Sincronización"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <ChevronRight size={20} className="text-primary/20 group-hover:text-accent" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
              <ClipboardList size={40} className="text-primary/20" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-primary">No hay reportes</h3>
              <p className="text-sm text-primary/60">Aún no has completado ningún servicio.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
