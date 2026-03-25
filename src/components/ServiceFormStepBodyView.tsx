import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepBodyViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepBodyView({ children, className }: ServiceFormStepBodyViewProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
