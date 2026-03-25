import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepLayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepLayoutContainer({ children, className }: ServiceFormStepLayoutContainerProps) {
  return (
    <div className={cn("max-w-2xl mx-auto space-y-8 pb-32 md:pb-12", className)}>
      {children}
    </div>
  );
}
