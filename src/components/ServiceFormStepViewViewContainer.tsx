import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepViewViewContainerProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function ServiceFormStepViewViewContainer({ children, isActive }: ServiceFormStepViewViewContainerProps) {
  if (!isActive) return null;

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      {children}
    </div>
  );
}
