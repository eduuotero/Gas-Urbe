import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepSectionViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ServiceFormStepSectionView({ children, className }: ServiceFormStepSectionViewProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
}
