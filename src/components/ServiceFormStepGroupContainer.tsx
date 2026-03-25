import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepGroupContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepGroupContainer({ children, className }: ServiceFormStepGroupContainerProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  );
}
