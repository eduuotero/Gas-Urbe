import React from 'react';
import ServiceSummary from '@/components/ServiceSummary';
import { ClipboardList, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepSummaryProps {
  data: any;
}

export default function ServiceFormStepSummary({ data }: ServiceFormStepSummaryProps) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-primary tracking-tight">Resumen Final</h3>
        <p className="text-sm text-primary/60 font-medium">
          Revise que toda la información sea correcta antes de finalizar.
        </p>
      </div>

      <div className="space-y-6">
        <ServiceSummary data={data} />

        <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3 border border-primary/10">
          <Info size={20} className="text-primary/40 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-primary/60 leading-relaxed">
            Al presionar "Finalizar", el reporte se enviará automáticamente a Salesforce.
          </p>
        </div>
      </div>
    </div>
  );
}
