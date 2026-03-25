import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepListViewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepListViewContainer({ children, className }: ServiceFormStepListViewContainerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}
