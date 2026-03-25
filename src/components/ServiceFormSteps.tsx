import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepsProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ServiceFormSteps({ currentStep, totalSteps, labels }: ServiceFormStepsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent">
          Paso {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">
          {labels[currentStep]}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              i <= currentStep ? "bg-accent" : "bg-primary/5"
            )}
          />
        ))}
      </div>
    </div>
  );
}
