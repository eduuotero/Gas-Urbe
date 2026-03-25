import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function ServiceFormStep({ children, isActive }: ServiceFormStepProps) {
  if (!isActive) return null;

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      {children}
    </div>
  );
}
