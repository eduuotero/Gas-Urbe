import React from 'react';
import { Camera, Trash2, Plus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepPhotoViewProps {
  label: string;
  description: string;
  photos: string[];
  onUpload: () => void;
  onRemove: (index: number) => void;
  maxPhotos?: number;
}

export default function ServiceFormStepPhotoView({ label, description, photos, onUpload, onRemove, maxPhotos = 5 }: ServiceFormStepPhotoViewProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">{label}</h3>
        <p className="text-sm text-primary/60 font-medium">{description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((url, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden relative border-2 border-gray-100 shadow-sm group animate-in zoom-in-95 duration-200">
            <img src={url} alt={`${label} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={() => onRemove(i)}
                className="p-3 bg-red-500 text-white rounded-full shadow-xl hover:bg-red-600 active:scale-90 transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
              Foto {i + 1}
            </div>
          </div>
        ))}
        
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={onUpload}
            className="aspect-square rounded-2xl border-4 border-dashed border-primary/5 flex flex-col items-center justify-center text-primary/20 hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all group active:scale-95"
          >
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Camera size={40} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-[10px] font-black uppercase mt-3 tracking-widest">Tomar Foto</span>
          </button>
        )}
      </div>

      {photos.length === 0 && (
        <div className="bg-accent/5 p-4 rounded-xl flex items-start gap-3 border border-accent/10">
          <Info size={20} className="text-accent shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-accent/80 leading-relaxed">
            Es obligatorio subir al menos una foto para poder continuar.
          </p>
        </div>
      )}
    </div>
  );
}
