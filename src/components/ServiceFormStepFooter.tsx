import React from 'react';
import { Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormStepFooterProps {
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
  canNext?: boolean;
}

export default function ServiceFormStepFooter({ onBack, onNext, isFirstStep, isLastStep, isSubmitting, canNext = true }: ServiceFormStepFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50 md:relative md:bg-transparent md:border-none md:p-0 md:mt-12">
      <div className="max-w-2xl mx-auto flex gap-3">
        {!isFirstStep && (
          <button 
            type="button" 
            onClick={onBack} 
            className="flex-1 p-4 rounded-xl border-2 border-primary/10 font-bold text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} />
            Atrás
          </button>
        )}
        <button 
          type={isLastStep ? "submit" : "button"} 
          onClick={isLastStep ? undefined : onNext} 
          disabled={!canNext || isSubmitting}
          className={cn(
            "flex-[2] p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
            isLastStep ? "bg-green-600 text-white hover:bg-green-700" : "bg-accent text-white hover:opacity-90",
            (!canNext || isSubmitting) && "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {isLastStep ? (
                <>
                  <Save size={20} />
                  Finalizar y Sincronizar
                </>
              ) : (
                <>
                  Siguiente
                  <ChevronRight size={20} />
                </>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
