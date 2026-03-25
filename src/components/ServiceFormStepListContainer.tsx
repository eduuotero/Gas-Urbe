import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepListContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepListContainer({ children, className }: ServiceFormStepListContainerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}
