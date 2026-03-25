import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepGroupViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepGroupView({ children, className }: ServiceFormStepGroupViewProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  );
}
