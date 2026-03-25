import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepWrapperViewContainerProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function ServiceFormStepWrapperViewContainer({ children, isActive }: ServiceFormStepWrapperViewContainerProps) {
  if (!isActive) return null;

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      {children}
    </div>
  );
}
