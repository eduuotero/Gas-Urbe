import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Play, ClipboardList } from 'lucide-react';

interface Client {
  id: string;
  nombre: string;
  direccion: string;
  hora: string;
  tipo: string;
  estatus: string;
}

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    direccion: 'Calle Falsa 123, Col. Centro',
    hora: '09:00 AM',
    tipo: 'Revisión general',
    estatus: 'pendiente'
  },
  {
    id: '2',
    nombre: 'María García',
    direccion: 'Av. Insurgentes 456, Col. Roma',
    hora: '11:30 AM',
    tipo: 'Cambio de medidor',
    estatus: 'pendiente'
  },
  {
    id: '3',
    nombre: 'Roberto Sánchez',
    direccion: 'Paseo de la Reforma 789, Col. Juárez',
    hora: '02:00 PM',
    tipo: 'Reparación de fuga',
    estatus: 'pendiente'
  },
  {
    id: '4',
    nombre: 'Ana Martínez',
    direccion: 'Calle Morelos 101, Col. Condesa',
    hora: '04:30 PM',
    tipo: 'Mantenimiento preventivo',
    estatus: 'pendiente'
  }
];

export default function Agenda() {
  const navigate = useNavigate();
  const [clients] = useState<Client[]>(MOCK_CLIENTS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Mi Agenda</h2>
          <p className="text-primary/60 text-sm">Jueves, 26 de Marzo</p>
        </div>
        <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {clients.length} Servicios
        </div>
      </div>

      <div className="space-y-4">
        {clients.map((service) => (
          <div 
            key={service.id} 
            className="card hover:border-accent/30 transition-colors cursor-pointer group"
            onClick={() => navigate(`/servicio/${service.id}`)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">{service.tipo}</span>
                </div>
                
                <h3 className="text-lg font-bold text-primary leading-tight">{service.nombre}</h3>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <MapPin size={16} className="text-accent" />
                    <span>{service.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/70 text-sm">
                    <Clock size={16} className="text-accent" />
                    <span>{service.hora}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Play size={20} className="text-accent ml-1" />
                </div>
                <span className="text-[10px] font-bold text-primary/40 uppercase">Iniciar</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State if no services */}
      {clients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
            <ClipboardList size={40} className="text-primary/20" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-primary">No hay servicios hoy</h3>
            <p className="text-sm text-primary/60">¡Buen trabajo! Has terminado tu agenda.</p>
          </div>
        </div>
      )}
    </div>
  );
}
