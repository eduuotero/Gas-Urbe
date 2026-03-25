import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepGroupViewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepGroupViewContainer({ children, className }: ServiceFormStepGroupViewContainerProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  );
}
