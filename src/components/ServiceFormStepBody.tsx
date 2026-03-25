import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepBody({ children, className }: ServiceFormStepBodyProps) {
  return (
    <div className={cn("animate-in slide-in-from-right-4 duration-300", className)}>
      {children}
    </div>
  );
}
