import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepItemViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepItemView({ children, className }: ServiceFormStepItemViewProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
