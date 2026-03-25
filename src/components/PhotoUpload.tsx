import React from 'react';
import { Camera, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  label: string;
  photos: string[];
  onUpload: () => void;
  onRemove: (index: number) => void;
  maxPhotos?: number;
}

export default function PhotoUpload({ label, photos, onUpload, onRemove, maxPhotos = 5 }: PhotoUploadProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary">{label}</h3>
        <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">
          {photos.length} / {maxPhotos}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((url, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden relative border border-gray-100 shadow-sm animate-in zoom-in-95 duration-200">
            <img src={url} alt={`${label} ${i + 1}`} className="w-full h-full object-cover" />
            <button 
              type="button"
              onClick={() => onRemove(i)}
              className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={onUpload}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-primary/40 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all group"
          >
            <Camera size={32} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase mt-1">Tomar Foto</span>
          </button>
        )}
      </div>
    </div>
  );
}
