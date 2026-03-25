import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepListViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepListView({ children, className }: ServiceFormStepListViewProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}
