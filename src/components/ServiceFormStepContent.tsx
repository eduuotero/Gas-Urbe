import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepContent({ children, className }: ServiceFormStepContentProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
