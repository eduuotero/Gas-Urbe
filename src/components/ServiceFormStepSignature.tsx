import React from 'react';
import SignaturePad from '@/components/SignaturePad';
import { PenTool, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepSignatureProps {
  onSave: (data: string) => void;
  onClear: () => void;
  hasFirma: boolean;
}

export default function ServiceFormStepSignature({ onSave, onClear, hasFirma }: ServiceFormStepSignatureProps) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">Firma del Cliente</h3>
        <p className="text-sm text-primary/60 font-medium">
          Por favor, solicite al cliente que firme en el recuadro para confirmar el servicio.
        </p>
      </div>

      <div className="space-y-4">
        <div className={cn(
          "card p-0 overflow-hidden border-2 transition-all duration-300",
          hasFirma ? "border-green-500 bg-green-50/10" : "border-primary/5"
        )}>
          <SignaturePad 
            onSave={onSave}
            onClear={onClear}
          />
        </div>

        {!hasFirma && (
          <div className="bg-accent/5 p-4 rounded-xl flex items-start gap-3 border border-accent/10">
            <Info size={20} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-accent/80 leading-relaxed">
              La firma es obligatoria para poder finalizar el registro del servicio.
            </p>
          </div>
        )}

        {hasFirma && (
          <div className="flex items-center justify-center gap-2 text-green-600 font-black text-xs uppercase tracking-widest animate-in zoom-in-95 duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Firma capturada correctamente
          </div>
        )}
      </div>
    </div>
  );
}
