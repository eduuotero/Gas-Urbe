import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { User, MapPin, Clock, CheckCircle2, AlertCircle, Search, Filter, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 19.4326,
  lng: -99.1332
};

// Mock data for technicians
const MOCK_TECNICOS = [
  {
    id: 't1',
    nombre: 'Juan Pérez',
    estatus: 'en_servicio',
    ubicacion: { lat: 19.435, lng: -99.140 },
    servicio_actual: 'Revisión general',
    cliente_actual: 'María García',
    completados: 4,
    pendientes: 2,
    ultimo_ping: new Date()
  },
  {
    id: 't2',
    nombre: 'Ricardo López',
    estatus: 'disponible',
    ubicacion: { lat: 19.420, lng: -99.120 },
    servicio_actual: null,
    cliente_actual: null,
    completados: 6,
    pendientes: 0,
    ultimo_ping: new Date()
  },
  {
    id: 't3',
    nombre: 'Alberto Sánchez',
    estatus: 'sin_senal',
    ubicacion: { lat: 19.440, lng: -99.150 },
    servicio_actual: 'Cambio de medidor',
    cliente_actual: 'Roberto Ruiz',
    completados: 2,
    pendientes: 3,
    ultimo_ping: new Date(Date.now() - 20 * 60000) // 20 mins ago
  }
];

const STATS = [
  { label: 'Total Servicios', value: 45, color: 'text-primary' },
  { label: 'Completados', value: 28, color: 'text-green-600' },
  { label: 'En Progreso', value: 12, color: 'text-accent' },
  { label: 'Pendientes', value: 5, color: 'text-orange-500' }
];

export default function RealTimeMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // User will need to provide this, but we'll show the UI
  });

  const [selectedTecnico, setSelectedTecnico] = useState<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const getMarkerIcon = (estatus: string) => {
    switch (estatus) {
      case 'disponible': return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'en_servicio': return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'sin_senal': return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      default: return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="card py-3 px-4 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/40">{stat.label}</span>
            <span className={cn("text-2xl font-black", stat.color)}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex gap-4 relative overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 card p-0 overflow-hidden relative border-2 border-primary/5">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#0B2545" }]
                  }
                ]
              }}
            >
              {MOCK_TECNICOS.map((tecnico) => (
                <Marker
                  key={tecnico.id}
                  position={tecnico.ubicacion}
                  icon={getMarkerIcon(tecnico.estatus)}
                  onClick={() => setSelectedTecnico(tecnico)}
                  title={tecnico.nombre}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="w-full h-full bg-primary/5 flex flex-col items-center justify-center text-primary/40 p-10 text-center">
              <MapPin size={48} className="mb-4 animate-bounce" />
              <p className="font-bold">Cargando Mapa de Coordinación...</p>
              <p className="text-xs mt-2 max-w-xs">Asegúrese de configurar su Google Maps API Key en el panel de administración.</p>
            </div>
          )}

          {/* Floating Search Bar */}
          <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 z-10">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 flex items-center gap-2">
              <Search size={18} className="text-primary/40 ml-2" />
              <input 
                type="text" 
                placeholder="Buscar técnico o zona..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
              />
              <button className="p-2 hover:bg-primary/5 rounded-lg text-primary/60">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Technician Detail Sidebar (Desktop) */}
        {selectedTecnico && (
          <div className="w-80 card flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-primary">Detalle de Técnico</h3>
              <button onClick={() => setSelectedTecnico(null)} className="p-1 hover:bg-primary/5 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/20">
                <User size={32} />
              </div>
              <div>
                <p className="font-bold text-primary text-lg leading-tight">{selectedTecnico.nombre}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    selectedTecnico.estatus === 'disponible' ? "bg-green-500" :
                    selectedTecnico.estatus === 'en_servicio' ? "bg-yellow-500" : "bg-red-500"
                  )} />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/60">
                    {selectedTecnico.estatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-primary/5 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-primary/40 uppercase">Servicio Actual</p>
                <p className="font-bold text-primary">{selectedTecnico.servicio_actual || 'Ninguno'}</p>
                {selectedTecnico.cliente_actual && (
                  <p className="text-xs text-primary/60 flex items-center gap-1">
                    <User size={12} /> {selectedTecnico.cliente_actual}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-gray-100 rounded-xl text-center">
                  <p className="text-[10px] font-bold text-primary/40 uppercase">Completados</p>
                  <p className="text-xl font-black text-green-600">{selectedTecnico.completados}</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-xl text-center">
                  <p className="text-[10px] font-bold text-primary/40 uppercase">Pendientes</p>
                  <p className="text-xl font-black text-orange-500">{selectedTecnico.pendientes}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm">
                <Clock size={16} />
                Ver Ruta Completa
              </button>
              <button className="w-full btn-accent py-3 flex items-center justify-center gap-2 text-sm">
                <AlertCircle size={16} />
                Reasignar Servicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
