import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepItemContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepItemContainer({ children, className }: ServiceFormStepItemContainerProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
