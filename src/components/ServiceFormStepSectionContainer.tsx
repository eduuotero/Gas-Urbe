import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepSectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepSectionContainer({ children, className }: ServiceFormStepSectionContainerProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
}
