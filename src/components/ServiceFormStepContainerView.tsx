import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepContainerViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepContainerView({ children, className }: ServiceFormStepContainerViewProps) {
  return (
    <div className={cn("max-w-2xl mx-auto space-y-8 pb-32 md:pb-12", className)}>
      {children}
    </div>
  );
}
