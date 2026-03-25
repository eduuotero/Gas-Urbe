import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, Play, ClipboardList, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, query, where, addDoc, getDocs } from 'firebase/firestore';

interface Client {
  id: string;
  nombre: string;
  direccion: string;
  hora: string;
  tipo: string;
  estatus: string;
}

export default function Agenda() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'clientes'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Client[];
      setClients(clientsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching clients:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const seedData = async () => {
    const mockClients = [
      {
        nombre: 'Juan Pérez',
        direccion: 'Calle Falsa 123, Col. Centro',
        hora: '09:00 AM',
        tipo: 'Revisión general',
        estatus: 'pendiente',
        id_contrato_salesforce: 'SF-1001'
      },
      {
        nombre: 'María García',
        direccion: 'Av. Insurgentes 456, Col. Roma',
        hora: '11:30 AM',
        tipo: 'Cambio de medidor',
        estatus: 'pendiente',
        id_contrato_salesforce: 'SF-1002'
      },
      {
        nombre: 'Roberto Sánchez',
        direccion: 'Paseo de la Reforma 789, Col. Juárez',
        hora: '02:00 PM',
        tipo: 'Reparación de fuga',
        estatus: 'pendiente',
        id_contrato_salesforce: 'SF-1003'
      }
    ];

    for (const client of mockClients) {
      await addDoc(collection(db, 'clientes'), client);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Mi Agenda</h2>
          <p className="text-primary/60 text-sm">Miércoles, 25 de Marzo</p>
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
          
          <button 
            onClick={seedData}
            className="btn-accent px-6 py-3 flex items-center gap-2"
          >
            <Plus size={20} />
            Generar Agenda de Prueba
          </button>
        </div>
      )}
    </div>
  );
}
