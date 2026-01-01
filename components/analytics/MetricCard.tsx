'use client';

import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  percentage?: number;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  change,
  trend,
  subtitle,
  percentage,
  className,
}: MetricCardProps) {
  const trendColor = 
    trend === 'up' ? 'text-green-600' : 
    trend === 'down' ? 'text-red-600' : 
    'text-gray-500';
  
  const trendIcon = 
    trend === 'up' ? '↗' : 
    trend === 'down' ? '↘' : 
    '→';

  return (
    <div className={cn(
      'bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          
          {percentage !== undefined && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {percentage.toFixed(0)}% complété
              </p>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-4xl ml-4">{icon}</div>
        )}
      </div>
      
      {change !== undefined && (
        <div className={cn('mt-3 text-sm flex items-center', trendColor)}>
          <span className="mr-1">{trendIcon}</span>
          <span>{Math.abs(change).toFixed(1)}%</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">vs. semaine précédente</span>
        </div>
      )}
    </div>
  );
}
