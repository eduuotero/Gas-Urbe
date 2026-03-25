import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepViewContainerProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function ServiceFormStepViewContainer({ children, isActive }: ServiceFormStepViewContainerProps) {
  if (!isActive) return null;

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      {children}
    </div>
  );
}
