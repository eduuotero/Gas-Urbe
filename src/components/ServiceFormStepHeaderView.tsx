import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceFormStepHeaderViewProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function ServiceFormStepHeaderView({ title, description, icon }: ServiceFormStepHeaderViewProps) {
  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-accent shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-xl font-black text-primary tracking-tight leading-none">{title}</h3>
          <p className="text-sm text-primary/60 font-medium leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
