import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepItemViewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepItemViewContainer({ children, className }: ServiceFormStepItemViewContainerProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
