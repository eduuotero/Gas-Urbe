import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color?: string;
  description?: string;
}

export default function StatsCard({ label, value, trend, icon: Icon, color = 'text-primary', description }: StatsCardProps) {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={cn("p-2 rounded-lg bg-primary/5", color)}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-full",
            trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-black text-primary">{value}</p>
        {description && <p className="text-xs text-primary/60 mt-1">{description}</p>}
      </div>
    </div>
  );
}
