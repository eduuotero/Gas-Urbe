import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepBodyContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepBodyContainer({ children, className }: ServiceFormStepBodyContainerProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
