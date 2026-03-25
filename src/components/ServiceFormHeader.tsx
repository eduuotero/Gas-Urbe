import React from 'react';
import { ChevronLeft, MapPin, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceFormHeaderProps {
  clientName: string;
  address: string;
  time?: string;
}

export default function ServiceFormHeader({ clientName, address, time }: ServiceFormHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-white p-6 pb-12 rounded-b-[40px] shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full -ml-20 -mb-20 blur-2xl" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="bg-accent/20 backdrop-blur-md px-3 py-1 rounded-full border border-accent/30">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">En Servicio</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
              <User size={24} className="text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight leading-none">{clientName}</h1>
              <div className="flex items-center gap-1.5 text-white/60">
                <MapPin size={14} className="text-accent" />
                <p className="text-xs font-bold truncate max-w-[200px]">{address}</p>
              </div>
            </div>
          </div>

          {time && (
            <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-xl border border-white/10">
              <Clock size={14} className="text-accent" />
              <span className="text-xs font-black uppercase tracking-widest">{time}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
