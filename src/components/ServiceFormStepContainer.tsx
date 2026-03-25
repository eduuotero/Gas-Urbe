import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepContainer({ children, className }: ServiceFormStepContainerProps) {
  return (
    <div className={cn("max-w-2xl mx-auto space-y-8 pb-32 md:pb-12", className)}>
      {children}
    </div>
  );
}
