import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepBodyViewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepBodyViewContainer({ children, className }: ServiceFormStepBodyViewContainerProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
