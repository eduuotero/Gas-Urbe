import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepSectionViewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepSectionViewContainer({ children, className }: ServiceFormStepSectionViewContainerProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
}
